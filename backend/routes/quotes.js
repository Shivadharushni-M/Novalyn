const express = require('express');
const {
  createQuote,
  getBookQuotes,
  getUserQuotes,
  getQuote,
  updateQuote,
  deleteQuote,
  likeQuote,
  unlikeQuote
} = require('../controllers/quoteController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/book/:bookId', getBookQuotes);
router.get('/:id', getQuote);

// Protected routes
router.post('/', protect, createQuote);
router.get('/user', protect, getUserQuotes);
router.put('/:id', protect, updateQuote);
router.delete('/:id', protect, deleteQuote);
router.put('/:id/like', protect, likeQuote);
router.put('/:id/unlike', protect, unlikeQuote);

module.exports = router; 