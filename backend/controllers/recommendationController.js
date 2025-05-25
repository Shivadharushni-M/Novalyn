const Book = require('../models/Book');
const UserBook = require('../models/UserBook');
const User = require('../models/User');

// Get personalized book recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's reading history
    const userBooks = await UserBook.find({ user: userId })
      .populate('book', 'genre author');

    // Extract user's preferred genres and authors
    const userGenres = userBooks.map(ub => ub.book.genre);
    const userAuthors = userBooks.map(ub => ub.book.author);
    const readBookIds = userBooks.map(ub => ub.book._id);

    // Find similar users based on reading history
    const similarUsers = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId }
        }
      },
      {
        $lookup: {
          from: 'userbooks',
          localField: '_id',
          foreignField: 'user',
          as: 'books'
        }
      },
      {
        $match: {
          'books.book.genre': { $in: userGenres }
        }
      },
      {
        $addFields: {
          commonGenres: {
            $size: {
              $setIntersection: [
                '$books.book.genre',
                userGenres
              ]
            }
          }
        }
      },
      {
        $sort: { commonGenres: -1 }
      },
      {
        $limit: 10
      }
    ]);

    const similarUserIds = similarUsers.map(u => u._id);

    // Get books liked by similar users
    const similarUserBooks = await UserBook.find({
      user: { $in: similarUserIds },
      rating: { $gte: 4 },
      book: { $nin: readBookIds }
    })
      .populate('book')
      .sort({ rating: -1 })
      .limit(10);

    // Get genre-based recommendations
    const genreRecommendations = await Book.find({
      _id: { $nin: readBookIds },
      genre: { $in: userGenres }
    })
      .sort({ averageRating: -1 })
      .limit(10);

    // Get author-based recommendations
    const authorRecommendations = await Book.find({
      _id: { $nin: readBookIds },
      author: { $in: userAuthors }
    })
      .sort({ averageRating: -1 })
      .limit(10);

    // Get trending books in user's preferred genres
    const trendingBooks = await Book.find({
      _id: { $nin: readBookIds },
      genre: { $in: userGenres }
    })
      .sort({ totalRatings: -1, averageRating: -1 })
      .limit(10);

    res.json({
      similarUserRecommendations: similarUserBooks.map(ub => ub.book),
      genreRecommendations,
      authorRecommendations,
      trendingBooks
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get trending books
exports.getTrendingBooks = async (req, res) => {
  try {
    const trendingBooks = await Book.find()
      .sort({ totalRatings: -1, averageRating: -1 })
      .limit(20);

    res.json(trendingBooks);
  } catch (error) {
    console.error('Error fetching trending books:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get new releases
exports.getNewReleases = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newReleases = await Book.find({
      publishedDate: { $gte: thirtyDaysAgo }
    })
      .sort({ publishedDate: -1 })
      .limit(20);

    res.json(newReleases);
  } catch (error) {
    console.error('Error fetching new releases:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get recommendations by genre
exports.getRecommendationsByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const recommendations = await Book.find({ genre })
      .sort({ averageRating: -1, totalRatings: -1 })
      .limit(20);

    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching genre recommendations:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 