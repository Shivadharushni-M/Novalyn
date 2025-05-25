const express = require('express');
const {
  addBookToCollection,
  getUserBooks,
  getUserBook,
  updateReadingStatus,
  updateReadingProgress,
  rateBook,
  removeFromCollection
} = require('../controllers/userBookController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/', addBookToCollection);
router.get('/', getUserBooks);
router.get('/:id', getUserBook);
router.put('/:id/status', updateReadingStatus);
router.put('/:id/progress', updateReadingProgress);
router.put('/:id/rate', rateBook);
router.delete('/:id', removeFromCollection);

module.exports = router; 