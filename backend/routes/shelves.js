const express = require('express');
const {
  createShelf,
  getShelves,
  getShelf,
  updateShelf,
  deleteShelf,
  addBookToShelf,
  removeBookFromShelf
} = require('../controllers/shelfController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/', createShelf);
router.get('/', getShelves);
router.get('/:id', getShelf);
router.put('/:id', updateShelf);
router.delete('/:id', deleteShelf);
router.put('/:id/books/:bookId', addBookToShelf);
router.delete('/:id/books/:bookId', removeBookFromShelf);

module.exports = router; 