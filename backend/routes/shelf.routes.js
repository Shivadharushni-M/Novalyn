const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Shelf = require('../models/Shelf');

// Get user's shelves
router.get('/', async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    console.error('Error fetching shelves:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new shelf
router.post('/', async (req, res) => {
  try {
    res.status(201).json({});
  } catch (error) {
    console.error('Error creating shelf:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update shelf
router.put('/:id', [auth,
  body('name').trim().notEmpty(),
  body('description').trim().optional(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const shelf = await Shelf.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!shelf) {
      return res.status(404).json({ message: 'Shelf not found' });
    }

    if (shelf.isDefault) {
      return res.status(400).json({ message: 'Cannot modify default shelf' });
    }

    shelf.name = req.body.name;
    shelf.description = req.body.description;

    await shelf.save();
    res.json(shelf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete shelf
router.delete('/:id', auth, async (req, res) => {
  try {
    const shelf = await Shelf.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!shelf) {
      return res.status(404).json({ message: 'Shelf not found' });
    }

    if (shelf.isDefault) {
      return res.status(400).json({ message: 'Cannot delete default shelf' });
    }

    await shelf.remove();
    res.json({ message: 'Shelf removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add book to shelf
router.post('/:id/books', [auth,
  body('bookId').notEmpty(),
  body('status').isIn(['want_to_read', 'currently_reading', 'finished_reading']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const shelf = await Shelf.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!shelf) {
      return res.status(404).json({ message: 'Shelf not found' });
    }

    const bookEntry = {
      book: req.body.bookId,
      status: req.body.status,
      dateStarted: req.body.status === 'currently_reading' ? Date.now() : undefined,
      dateFinished: req.body.status === 'finished_reading' ? Date.now() : undefined,
    };

    shelf.books.push(bookEntry);
    await shelf.save();

    res.status(201).json(shelf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update book status and progress
router.put('/:shelfId/books/:bookId', [auth,
  body('status').isIn(['want_to_read', 'currently_reading', 'finished_reading']).optional(),
  body('currentPage').isInt({ min: 0 }).optional(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const shelf = await Shelf.findOne({
      _id: req.params.shelfId,
      user: req.user.id,
    });

    if (!shelf) {
      return res.status(404).json({ message: 'Shelf not found' });
    }

    const bookIndex = shelf.books.findIndex(
      book => book.book.toString() === req.params.bookId
    );

    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found in shelf' });
    }

    if (req.body.status) {
      shelf.books[bookIndex].status = req.body.status;
      if (req.body.status === 'currently_reading') {
        shelf.books[bookIndex].dateStarted = Date.now();
      } else if (req.body.status === 'finished_reading') {
        shelf.books[bookIndex].dateFinished = Date.now();
      }
    }

    if (req.body.currentPage !== undefined) {
      shelf.books[bookIndex].progress = {
        currentPage: req.body.currentPage,
        lastUpdated: Date.now(),
      };
    }

    await shelf.save();
    res.json(shelf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove book from shelf
router.delete('/:shelfId/books/:bookId', auth, async (req, res) => {
  try {
    const shelf = await Shelf.findOne({
      _id: req.params.shelfId,
      user: req.user.id,
    });

    if (!shelf) {
      return res.status(404).json({ message: 'Shelf not found' });
    }

    shelf.books = shelf.books.filter(
      book => book.book.toString() !== req.params.bookId
    );

    await shelf.save();
    res.json(shelf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 