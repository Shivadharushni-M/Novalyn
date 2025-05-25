const UserBook = require('../models/UserBook');
const Book = require('../models/Book');
const User = require('../models/User');

// @desc    Add book to user's collection
// @route   POST /api/userbooks
// @access  Private
exports.addBookToCollection = async (req, res) => {
  try {
    const { bookId, status, shelves } = req.body;
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Check if book is already in user's collection
    const existingUserBook = await UserBook.findOne({
      user: req.user.id,
      book: bookId
    });
    
    if (existingUserBook) {
      return res.status(400).json({
        success: false,
        message: 'Book is already in your collection'
      });
    }
    
    // Create userBook
    const userBook = await UserBook.create({
      user: req.user.id,
      book: bookId,
      status: status || 'want-to-read',
      shelves: shelves || [],
      startedAt: status === 'currently-reading' ? Date.now() : null
    });
    
    // Populate book details
    const populatedUserBook = await UserBook.findById(userBook._id).populate('book');
    
    res.status(201).json({
      success: true,
      data: populatedUserBook
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user's books
// @route   GET /api/userbooks
// @access  Private
exports.getUserBooks = async (req, res) => {
  try {
    const { status, shelf, sortBy, limit = 10, page = 1 } = req.query;
    const query = { user: req.user.id };
    
    // Filter by status
    if (status) query.status = status;
    
    // Filter by shelf
    if (shelf) query.shelves = shelf;
    
    // Sort options
    let sort = {};
    if (sortBy === 'recent') sort = { createdAt: -1 };
    if (sortBy === 'title') sort = { 'book.title': 1 };
    if (sortBy === 'author') sort = { 'book.author': 1 };
    
    // Pagination
    const skip = (page - 1) * limit;
    
    const userBooks = await UserBook.find(query)
      .populate('book')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await UserBook.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: userBooks.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      data: userBooks
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single userBook
// @route   GET /api/userbooks/:id
// @access  Private
exports.getUserBook = async (req, res) => {
  try {
    const userBook = await UserBook.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('book').populate('shelves');
    
    if (!userBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found in your collection'
      });
    }
    
    res.status(200).json({
      success: true,
      data: userBook
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update reading status
// @route   PUT /api/userbooks/:id/status
// @access  Private
exports.updateReadingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['want-to-read', 'currently-reading', 'read'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    // Find userBook
    const userBook = await UserBook.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!userBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found in your collection'
      });
    }
    
    // Update status and related fields
    const updateData = { status };
    
    // Set timestamps based on status change
    if (status === 'currently-reading' && userBook.status !== 'currently-reading') {
      updateData.startedAt = Date.now();
    }
    
    if (status === 'read' && userBook.status !== 'read') {
      updateData.finishedAt = Date.now();
      
      // Update user's reading goal count
      const currentYear = new Date().getFullYear();
      const user = await User.findById(req.user.id);
      
      if (user.readingGoal && user.readingGoal.year === currentYear) {
        await User.findByIdAndUpdate(req.user.id, {
          $inc: { 'readingGoal.completed': 1 }
        });
      }
    }
    
    // Update the userBook
    const updatedUserBook = await UserBook.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('book');
    
    res.status(200).json({
      success: true,
      data: updatedUserBook
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update reading progress
// @route   PUT /api/userbooks/:id/progress
// @access  Private
exports.updateReadingProgress = async (req, res) => {
  try {
    const { currentPage } = req.body;
    
    if (currentPage === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current page'
      });
    }
    
    // Find userBook
    const userBook = await UserBook.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('book');
    
    if (!userBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found in your collection'
      });
    }
    
    // Update progress
    userBook.currentPage = currentPage;
    
    // Check if finished reading
    if (currentPage >= userBook.book.pageCount && userBook.status !== 'read') {
      userBook.status = 'read';
      userBook.finishedAt = Date.now();
      
      // Update user's reading goal count
      const currentYear = new Date().getFullYear();
      const user = await User.findById(req.user.id);
      
      if (user.readingGoal && user.readingGoal.year === currentYear) {
        await User.findByIdAndUpdate(req.user.id, {
          $inc: { 'readingGoal.completed': 1 }
        });
      }
    }
    
    await userBook.save();
    
    res.status(200).json({
      success: true,
      data: userBook
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Rate a book
// @route   PUT /api/userbooks/:id/rate
// @access  Private
exports.rateBook = async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a rating between 1 and 5'
      });
    }
    
    // Find userBook
    const userBook = await UserBook.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!userBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found in your collection'
      });
    }
    
    // Update rating
    userBook.rating = rating;
    await userBook.save();
    
    res.status(200).json({
      success: true,
      data: userBook
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Remove book from collection
// @route   DELETE /api/userbooks/:id
// @access  Private
exports.removeFromCollection = async (req, res) => {
  try {
    const userBook = await UserBook.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!userBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found in your collection'
      });
    }
    
    await userBook.remove();
    
    res.status(200).json({
      success: true,
      message: 'Book removed from collection'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}; 