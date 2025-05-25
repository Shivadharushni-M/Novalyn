const express = require('express');
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  uploadCoverImage,
  getRecommendations
} = require('../controllers/bookController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getBooks);
router.get('/:id', getBook);

// Protected routes
router.post('/', protect, createBook);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);
router.put('/:id/cover', protect, uploadCoverImage);
router.get('/recommendations', protect, getRecommendations);

module.exports = router; 