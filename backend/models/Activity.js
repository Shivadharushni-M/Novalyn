const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [
      'started_reading',
      'finished_reading',
      'rated_book',
      'reviewed_book',
      'added_to_shelf',
      'followed_user',
      'created_shelf'
    ],
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: function() {
      return ['started_reading', 'finished_reading', 'rated_book', 'reviewed_book', 'added_to_shelf'].includes(this.type);
    }
  },
  shelf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelf',
    required: function() {
      return ['added_to_shelf', 'created_shelf'].includes(this.type);
    }
  },
  targetUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return this.type === 'followed_user';
    }
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: function() {
      return this.type === 'rated_book';
    }
  },
  review: {
    type: String,
    required: function() {
      return this.type === 'reviewed_book';
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster activity feed queries
activitySchema.index({ user: 1, createdAt: -1 });
activitySchema.index({ type: 1, createdAt: -1 });

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity; 