const User = require('../models/User');
const UserBook = require('../models/UserBook');
const Activity = require('../models/Activity');
const mongoose = require('mongoose');

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.userId);
    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentUser = await User.findById(req.user.id);
    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({ message: 'Already following this user' });
    }

    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);

    await Promise.all([currentUser.save(), userToFollow.save()]);

    res.json({ message: 'Successfully followed user' });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.userId);
    if (!userToUnfollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentUser = await User.findById(req.user.id);
    if (!currentUser.following.includes(userToUnfollow._id)) {
      return res.status(400).json({ message: 'Not following this user' });
    }

    currentUser.following = currentUser.following.filter(
      id => !id.equals(userToUnfollow._id)
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      id => !id.equals(currentUser._id)
    );

    await Promise.all([currentUser.save(), userToUnfollow.save()]);

    res.json({ message: 'Successfully unfollowed user' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get activity feed
exports.getActivityFeed = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const following = currentUser.following;

    const activities = await Activity.find({
      user: { $in: [...following, req.user.id] }
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('user', 'name profilePicture')
      .populate('book', 'title author coverImage')
      .populate('shelf', 'name');

    res.json(activities);
  } catch (error) {
    console.error('Error fetching activity feed:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get suggested users
exports.getSuggestedUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const following = currentUser.following;

    // Find users with similar reading interests
    const userBooks = await UserBook.find({ user: req.user.id });
    const genres = [...new Set(userBooks.map(ub => ub.book.genre))];

    const suggestedUsers = await User.aggregate([
      {
        $match: {
          _id: { 
            $nin: [...following, mongoose.Types.ObjectId(req.user.id)]
          }
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
          'books.book.genre': { $in: genres }
        }
      },
      {
        $addFields: {
          commonGenres: {
            $size: {
              $setIntersection: [
                '$books.book.genre',
                genres
              ]
            }
          },
          booksRead: { $size: '$books' }
        }
      },
      {
        $sort: { commonGenres: -1, booksRead: -1 }
      },
      {
        $limit: 10
      },
      {
        $project: {
          name: 1,
          profilePicture: 1,
          booksRead: 1
        }
      }
    ]);

    res.json(suggestedUsers);
  } catch (error) {
    console.error('Error fetching suggested users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's followers
exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('followers', 'name profilePicture');
    res.json(user.followers);
  } catch (error) {
    console.error('Error fetching followers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get users being followed
exports.getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('following', 'name profilePicture');
    res.json(user.following);
  } catch (error) {
    console.error('Error fetching following:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 