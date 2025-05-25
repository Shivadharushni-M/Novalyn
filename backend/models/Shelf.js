const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  books: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    status: {
      type: String,
      enum: ['want_to_read', 'currently_reading', 'finished_reading'],
      default: 'want_to_read',
    },
    progress: {
      currentPage: {
        type: Number,
        default: 0,
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    },
    dateStarted: Date,
    dateFinished: Date,
    notes: String,
  }],
}, {
  timestamps: true,
});

// Create default shelves for new users
shelfSchema.statics.createDefaultShelves = async function(userId) {
  const defaultShelves = [
    { name: 'Want to Read', isDefault: true },
    { name: 'Currently Reading', isDefault: true },
    { name: 'Finished Reading', isDefault: true },
    { name: 'Favorites', isDefault: true },
  ];

  const shelves = defaultShelves.map(shelf => ({
    user: userId,
    name: shelf.name,
    isDefault: shelf.isDefault,
    description: `Default ${shelf.name} shelf`,
  }));

  return await this.insertMany(shelves);
};

const Shelf = mongoose.model('Shelf', shelfSchema);
module.exports = Shelf; 