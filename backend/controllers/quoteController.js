const Quote = require('../models/Quote');
const Book = require('../models/Book');

// @desc    Create a new quote
// @route   POST /api/quotes
// @access  Private
exports.createQuote = async (req, res) => {
  try {
    const { bookId, text, page, chapter } = req.body;
    
    if (!bookId || !text) {
      return res.status(400).json({
        success: false,
        message: 'Please provide book ID and quote text'
      });
    }
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Create quote
    const quote = await Quote.create({
      book: bookId,
      user: req.user.id,
      text,
      page,
      chapter
    });
    
    // Populate book and user details
    const populatedQuote = await Quote.findById(quote._id)
      .populate('user', 'name profileImage')
      .populate('book', 'title author');
    
    res.status(201).json({
      success: true,
      data: populatedQuote
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get quotes for a book
// @route   GET /api/quotes/book/:bookId
// @access  Public
exports.getBookQuotes = async (req, res) => {
  try {
    const { sortBy = 'popular', limit = 10, page = 1 } = req.query;
    
    // Check if book exists
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Sort options
    let sort = {};
    if (sortBy === 'popular') sort = { 'likes.length': -1 };
    if (sortBy === 'newest') sort = { createdAt: -1 };
    if (sortBy === 'oldest') sort = { createdAt: 1 };
    
    // Pagination
    const skip = (page - 1) * limit;
    
    const quotes = await Quote.find({ book: req.params.bookId })
      .populate('user', 'name profileImage')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Quote.countDocuments({ book: req.params.bookId });
    
    res.status(200).json({
      success: true,
      count: quotes.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      data: quotes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get quotes by user
// @route   GET /api/quotes/user
// @access  Private
exports.getUserQuotes = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    
    // Pagination
    const skip = (page - 1) * limit;
    
    const quotes = await Quote.find({ user: req.user.id })
      .populate('book', 'title author coverImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Quote.countDocuments({ user: req.user.id });
    
    res.status(200).json({
      success: true,
      count: quotes.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      data: quotes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get a single quote
// @route   GET /api/quotes/:id
// @access  Public
exports.getQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate('user', 'name profileImage')
      .populate('book', 'title author coverImage');
    
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: quote
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update a quote
// @route   PUT /api/quotes/:id
// @access  Private
exports.updateQuote = async (req, res) => {
  try {
    const { text, page, chapter } = req.body;
    const updateData = {};
    
    if (text) updateData.text = text;
    if (page !== undefined) updateData.page = page;
    if (chapter !== undefined) updateData.chapter = chapter;
    
    // Find quote and check ownership
    const quote = await Quote.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found or not authorized'
      });
    }
    
    // Update quote
    Object.assign(quote, updateData);
    await quote.save();
    
    // Get updated quote with populated fields
    const updatedQuote = await Quote.findById(quote._id)
      .populate('user', 'name profileImage')
      .populate('book', 'title author');
    
    res.status(200).json({
      success: true,
      data: updatedQuote
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete a quote
// @route   DELETE /api/quotes/:id
// @access  Private
exports.deleteQuote = async (req, res) => {
  try {
    // Find quote and check ownership
    const quote = await Quote.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found or not authorized'
      });
    }
    
    await quote.remove();
    
    res.status(200).json({
      success: true,
      message: 'Quote removed'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Like a quote
// @route   PUT /api/quotes/:id/like
// @access  Private
exports.likeQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }
    
    // Check if user has already liked
    if (quote.likes.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'You have already liked this quote'
      });
    }
    
    // Add like
    quote.likes.push(req.user.id);
    await quote.save();
    
    res.status(200).json({
      success: true,
      message: 'Quote liked'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Unlike a quote
// @route   PUT /api/quotes/:id/unlike
// @access  Private
exports.unlikeQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }
    
    // Remove like
    quote.likes = quote.likes.filter(
      userId => userId.toString() !== req.user.id
    );
    
    await quote.save();
    
    res.status(200).json({
      success: true,
      message: 'Quote unliked'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}; 