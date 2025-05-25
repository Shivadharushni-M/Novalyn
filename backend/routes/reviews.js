const express = require('express');
const {
  createReview,
  getBookReviews,
  getReview,
  updateReview,
  deleteReview,
  upvoteReview,
  removeUpvote,
  addComment,
  deleteComment
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/book/:bookId', getBookReviews);
router.get('/:id', getReview);

// Protected routes
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.put('/:id/upvote', protect, upvoteReview);
router.put('/:id/remove-upvote', protect, removeUpvote);
router.post('/:id/comments', protect, addComment);
router.delete('/:id/comments/:commentId', protect, deleteComment);

module.exports = router; 