const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getRecommendations,
  getTrendingBooks,
  getNewReleases,
  getRecommendationsByGenre
} = require('../controllers/recommendationController');

// Get personalized recommendations
router.get('/', auth, getRecommendations);

// Get trending books
router.get('/trending', getTrendingBooks);

// Get new releases
router.get('/new-releases', getNewReleases);

// Get recommendations by genre
router.get('/genre/:genre', getRecommendationsByGenre);

// Get book recommendations
router.get('/book', async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 