const Book = require('../models/Book');
const UserBook = require('../models/UserBook');
const upload = require('../middleware/upload');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
exports.getBooks = async (req, res) => {
  try {
    const { title, author, genre, sortBy, limit = 10, page = 1 } = req.query;
    const query = {};
    
    // Build filter object
    if (title) query.title = { $regex: title, $options: 'i' };
    if (author) query.author = { $regex: author, $options: 'i' };
    if (genre) query.genre = { $regex: genre, $options: 'i' };
    
    // Sort options
    let sort = {};
    if (sortBy === 'newest') sort = { createdAt: -1 };
    if (sortBy === 'rating') sort = { averageRating: -1 };
    if (sortBy === 'title') sort = { title: 1 };
    
    // Pagination
    const skip = (page - 1) * limit;
    
    const books = await Book.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Book.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: books.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      data: books
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (err) {
    console.error(err);
    
    // Check if error is due to invalid ID format
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private
exports.createBook = async (req, res) => {
  try {
    const { title, author, description, genre, pageCount, publishedYear, isbn } = req.body;
    
    // Create book
    const book = await Book.create({
      title,
      author,
      description,
      genre,
      pageCount,
      publishedYear,
      isbn
    });
    
    res.status(201).json({
      success: true,
      data: book
    });
  } catch (err) {
    console.error(err);
    
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private (Admin)
exports.updateBook = async (req, res) => {
  try {
    const { title, author, description, genre, pageCount, publishedYear, isbn } = req.body;
    
    // Build update object
    const updateData = {};
    if (title) updateData.title = title;
    if (author) updateData.author = author;
    if (description) updateData.description = description;
    if (genre) updateData.genre = genre;
    if (pageCount) updateData.pageCount = pageCount;
    if (publishedYear) updateData.publishedYear = publishedYear;
    if (isbn) updateData.isbn = isbn;
    
    // Find and update book
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: book
    });
  } catch (err) {
    console.error(err);
    
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Upload book cover image
// @route   PUT /api/books/:id/cover
// @access  Private (Admin)
exports.uploadCoverImage = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    const uploadSingle = upload.single('coverImage');
    
    uploadSingle(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a file'
        });
      }
      
      // Update book with new cover image
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        { coverImage: req.file.filename },
        { new: true }
      );
      
      res.status(200).json({
        success: true,
        data: updatedBook
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private (Admin)
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    await book.remove();
    
    res.status(200).json({
      success: true,
      message: 'Book removed'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get book recommendations
// @route   GET /api/books/recommendations
// @access  Private
exports.getRecommendations = async (req, res) => {
  try {
    // Find user's books
    const userBooks = await UserBook.find({ user: req.user.id }).select('book');
    const userBookIds = userBooks.map(ub => ub.book);
    
    // Find books with the same genres as the user's books with high ratings
    const userGenres = await Book.find({ _id: { $in: userBookIds } }).distinct('genre');
    
    // Find recommended books that user doesn't have, with same genres and good ratings
    const recommendations = await Book.find({
      _id: { $nin: userBookIds },
      genre: { $in: userGenres },
      averageRating: { $gte: 4 }
    })
    .sort({ averageRating: -1 })
    .limit(10);
    
    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}; 