const Review = require('../models/Review');
const Book = require('../models/Book');
const UserBook = require('../models/UserBook');

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const { bookId, text, rating } = req.body;
    
    if (!bookId || !text || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Please provide book ID, review text, and rating'
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
    
    // Check if user has already reviewed this book
    const existingReview = await Review.findOne({
      user: req.user.id,
      book: bookId
    });
    
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this book'
      });
    }
    
    // Create review
    const review = await Review.create({
      user: req.user.id,
      book: bookId,
      text,
      rating
    });
    
    // Also update user's book rating if they have it in their collection
    await UserBook.findOneAndUpdate(
      { user: req.user.id, book: bookId },
      { rating }
    );
    
    // Populate user details
    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name profileImage')
      .populate('book', 'title author');
    
    res.status(201).json({
      success: true,
      data: populatedReview
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all reviews for a book
// @route   GET /api/reviews/book/:bookId
// @access  Public
exports.getBookReviews = async (req, res) => {
  try {
    const { sortBy = 'newest', limit = 10, page = 1 } = req.query;
    
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
    if (sortBy === 'newest') sort = { createdAt: -1 };
    if (sortBy === 'oldest') sort = { createdAt: 1 };
    if (sortBy === 'highest') sort = { rating: -1 };
    if (sortBy === 'lowest') sort = { rating: 1 };
    if (sortBy === 'popular') sort = { 'upvotes.length': -1 };
    
    // Pagination
    const skip = (page - 1) * limit;
    
    const reviews = await Review.find({ book: req.params.bookId })
      .populate('user', 'name profileImage')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Review.countDocuments({ book: req.params.bookId });
    
    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      data: reviews
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get a single review
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'name profileImage')
      .populate('book', 'title author coverImage')
      .populate('comments.user', 'name profileImage');
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: review
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res) => {
  try {
    const { text, rating } = req.body;
    const updateData = {};
    
    if (text) updateData.text = text;
    if (rating) updateData.rating = rating;
    
    // Find review and check ownership
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or not authorized'
      });
    }
    
    // Update review
    Object.assign(review, updateData);
    await review.save();
    
    // Also update user's book rating if they have it in their collection
    if (rating) {
      await UserBook.findOneAndUpdate(
        { user: req.user.id, book: review.book },
        { rating }
      );
    }
    
    // Populate user details
    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name profileImage')
      .populate('book', 'title author');
    
    res.status(200).json({
      success: true,
      data: populatedReview
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res) => {
  try {
    // Find review and check ownership
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or not authorized'
      });
    }
    
    await review.remove();
    
    res.status(200).json({
      success: true,
      message: 'Review removed'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Upvote a review
// @route   PUT /api/reviews/:id/upvote
// @access  Private
exports.upvoteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Check if user has already upvoted
    if (review.upvotes.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'You have already upvoted this review'
      });
    }
    
    // Add upvote
    review.upvotes.push(req.user.id);
    await review.save();
    
    res.status(200).json({
      success: true,
      message: 'Review upvoted'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Remove upvote from a review
// @route   PUT /api/reviews/:id/remove-upvote
// @access  Private
exports.removeUpvote = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Remove upvote
    review.upvotes = review.upvotes.filter(
      userId => userId.toString() !== req.user.id
    );
    
    await review.save();
    
    res.status(200).json({
      success: true,
      message: 'Upvote removed'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Add comment to a review
// @route   POST /api/reviews/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Please provide comment text'
      });
    }
    
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Add comment
    review.comments.push({
      user: req.user.id,
      text
    });
    
    await review.save();
    
    // Get updated review with populated fields
    const updatedReview = await Review.findById(req.params.id)
      .populate('comments.user', 'name profileImage');
    
    res.status(200).json({
      success: true,
      data: updatedReview.comments[updatedReview.comments.length - 1]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete comment from a review
// @route   DELETE /api/reviews/:id/comments/:commentId
// @access  Private
exports.deleteComment = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Find comment
    const comment = review.comments.id(req.params.commentId);
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    
    // Check ownership
    if (comment.user.toString() !== req.user.id && review.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this comment'
      });
    }
    
    // Remove comment
    comment.remove();
    await review.save();
    
    res.status(200).json({
      success: true,
      message: 'Comment removed'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};