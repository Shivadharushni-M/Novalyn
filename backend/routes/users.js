const express = require('express');
const {
  updateProfile,
  uploadProfileImage,
  setReadingGoal,
  getReadingStats,
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// Profile routes
router.put('/profile', updateProfile);
router.put('/profile/image', uploadProfileImage);

// Reading goal routes
router.put('/reading-goal', setReadingGoal);
router.get('/stats', getReadingStats);

// Social routes
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unfollowUser);
router.get('/following', getFollowing);
router.get('/followers', getFollowers);

module.exports = router; 