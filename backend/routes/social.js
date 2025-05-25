const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  followUser,
  unfollowUser,
  getActivityFeed,
  getSuggestedUsers,
  getFollowers,
  getFollowing,
} = require('../controllers/socialController');

// Follow/Unfollow routes
router.post('/follow/:userId', auth, followUser);
router.post('/unfollow/:userId', auth, unfollowUser);

// Activity feed
router.get('/activity-feed', auth, getActivityFeed);

// User suggestions
router.get('/suggested-users', auth, getSuggestedUsers);

// Followers/Following lists
router.get('/followers', auth, getFollowers);
router.get('/following', auth, getFollowing);

// Get activity feed
router.get('/activity', async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Follow a user
router.post('/follow/:userId', async (req, res) => {
  try {
    res.json({ message: 'User followed successfully' });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 