const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  text: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  page: Number,
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  coverImage: {
    type: String,
    default: 'default-book-cover.jpg'
  },
  isbn: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  publishedDate: Date,
  publisher: {
    type: String,
    trim: true
  },
  pageCount: {
    type: Number,
    required: true,
    min: 1
  },
  language: {
    type: String,
    trim: true,
    default: 'English'
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  reviews: [reviewSchema],
  quotes: [quoteSchema],
  tags: [{
    type: String,
    trim: true
  }],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Create text index for search
bookSchema.index({
  title: 'text',
  author: 'text',
  description: 'text',
  genre: 'text'
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book; 