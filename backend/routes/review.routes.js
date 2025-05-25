const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Book = require('../models/Book');
const User = require('../models/User');

// Get all reviews for a book
router.get('/book/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
      .populate('reviews.user', 'username name profilePicture');
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book.reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a review
router.post('/book/:bookId', [
  auth,
  body('rating').isInt({ min: 1, max: 5 }),
  body('text').trim().optional(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user already reviewed
    const existingReview = book.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = {
      user: req.user.id,
      rating: req.body.rating,
      text: req.body.text
    };

    book.reviews.unshift(review);

    // Update book rating
    const totalRatings = book.reviews.length;
    const ratingSum = book.reviews.reduce((sum, review) => sum + review.rating, 0);
    book.averageRating = ratingSum / totalRatings;
    book.totalRatings = totalRatings;

    await book.save();

    // Populate user info for the new review
    const populatedBook = await Book.findById(book._id)
      .populate('reviews.user', 'username name profilePicture');

    res.status(201).json(populatedBook.reviews[0]);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a review
router.put('/book/:bookId/review/:reviewId', [
  auth,
  body('rating').isInt({ min: 1, max: 5 }),
  body('text').trim().optional(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const review = book.reviews.id(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    review.rating = req.body.rating;
    review.text = req.body.text;
    review.updatedAt = Date.now();

    // Update book rating
    const totalRatings = book.reviews.length;
    const ratingSum = book.reviews.reduce((sum, review) => sum + review.rating, 0);
    book.averageRating = ratingSum / totalRatings;

    await book.save();

    // Populate user info
    const populatedBook = await Book.findById(book._id)
      .populate('reviews.user', 'username name profilePicture');
    const updatedReview = populatedBook.reviews.id(req.params.reviewId);

    res.json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a review
router.delete('/book/:bookId/review/:reviewId', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const review = book.reviews.id(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    review.remove();

    // Update book rating
    const totalRatings = book.reviews.length;
    if (totalRatings > 0) {
      const ratingSum = book.reviews.reduce((sum, review) => sum + review.rating, 0);
      book.averageRating = ratingSum / totalRatings;
    } else {
      book.averageRating = 0;
    }
    book.totalRatings = totalRatings;

    await book.save();
    res.json({ message: 'Review removed' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 