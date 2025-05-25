const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'],
    lowercase: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  profilePicture: {
    type: String,
    default: 'default-avatar.png'
  },
  readingGoals: {
    yearly: {
      target: { type: Number, default: 0 },
      completed: { type: Number, default: 0 }
    },
    monthly: {
      target: { type: Number, default: 0 },
      completed: { type: Number, default: 0 }
    }
  },
  readingStats: {
    totalBooksRead: { type: Number, default: 0 },
    totalPagesRead: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    favoriteGenres: [String],
    readingStreak: { type: Number, default: 0 },
    lastReadDate: Date
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  favoriteGenres: [{
    type: String,
  }],
  customShelves: [{
    name: String,
    description: String,
    isPublic: { type: Boolean, default: true },
    books: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }]
  }],
  notifications: [{
    type: {
      type: String,
      enum: ['follow', 'like', 'comment', 'reading_goal', 'recommendation'],
      required: true
    },
    message: String,
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    privateProfile: { type: Boolean, default: false },
    showCurrentlyReading: { type: Boolean, default: true },
    showReadingGoals: { type: Boolean, default: true },
    theme: { type: String, default: 'light' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Update reading streak
userSchema.methods.updateReadingStreak = async function() {
  const today = new Date();
  const lastRead = this.readingStats.lastReadDate;
  
  if (!lastRead) {
    this.readingStats.readingStreak = 1;
  } else {
    const diffDays = Math.floor((today - lastRead) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Already updated today
      return;
    } else if (diffDays === 1) {
      // Consecutive day
      this.readingStats.readingStreak += 1;
    } else {
      // Streak broken
      this.readingStats.readingStreak = 1;
    }
  }
  
  this.readingStats.lastReadDate = today;
  await this.save();
};

// Add notification
userSchema.methods.addNotification = async function(type, message, from, book) {
  this.notifications.unshift({
    type,
    message,
    from,
    book,
    read: false,
    createdAt: new Date()
  });
  
  // Keep only the latest 50 notifications
  if (this.notifications.length > 50) {
    this.notifications = this.notifications.slice(0, 50);
  }
  
  await this.save();
};

const User = mongoose.model('User', userSchema);
module.exports = User; 