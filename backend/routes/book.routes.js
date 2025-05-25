const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Book = require('../models/Book');

// Validation middleware
const validateBook = [
  body('title').trim().notEmpty(),
  body('author').trim().notEmpty(),
  body('description').trim().notEmpty(),
  body('genre').trim().notEmpty(),
  body('pageCount').isInt({ min: 1 }),
];

// Get all books with filters and pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, search, sort } = req.query;
    const query = {};

    // Apply filters
    if (genre) query.genre = genre;
    if (search) {
      query.$text = { $search: search };
    }

    // Apply sorting
    let sortOption = {};
    if (sort === 'rating') {
      sortOption = { averageRating: -1 };
    } else if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    }

    const books = await Book.find(query)
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalBooks: count,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('reviews.user', 'username profilePicture')
      .populate('quotes.addedBy', 'username');

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new book
router.post('/', [auth, validateBook], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = new Book(req.body);
    await book.save();

    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update book
router.put('/:id', [auth, validateBook], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete book
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book removed' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add review
router.post('/:id/reviews', [auth, 
  body('rating').isInt({ min: 1, max: 5 }),
  body('review').trim().optional(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const newReview = {
      user: req.user.id,
      rating: req.body.rating,
      review: req.body.review,
    };

    book.reviews.push(newReview);

    // Update average rating
    const totalRatings = book.reviews.length;
    const ratingSum = book.reviews.reduce((sum, review) => sum + review.rating, 0);
    book.averageRating = ratingSum / totalRatings;
    book.totalRatings = totalRatings;

    await book.save();

    res.status(201).json(book);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add quote
router.post('/:id/quotes', [auth,
  body('text').trim().notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const newQuote = {
      text: req.body.text,
      addedBy: req.user.id,
    };

    book.quotes.push(newQuote);
    await book.save();

    res.status(201).json(book);
  } catch (error) {
    console.error('Error adding quote:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 