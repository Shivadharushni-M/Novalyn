const mongoose = require('mongoose');

const UserBookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  status: {
    type: String,
    enum: ['want-to-read', 'currently-reading', 'read'],
    default: 'want-to-read'
  },
  currentPage: {
    type: Number,
    default: 0
  },
  startedAt: {
    type: Date
  },
  finishedAt: {
    type: Date
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  favorite: {
    type: Boolean,
    default: false
  },
  shelves: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelf'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index to ensure a user can only have a book once in their collection
UserBookSchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model('UserBook', UserBookSchema); 