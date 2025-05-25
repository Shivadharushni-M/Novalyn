const User = require('../models/User');
const UserBook = require('../models/UserBook');
const Shelf = require('../models/Shelf');
const upload = require('../middleware/upload');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const updateData = {};
    
    if (name) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Upload profile image
// @route   PUT /api/users/profile/image
// @access  Private
exports.uploadProfileImage = async (req, res) => {
  try {
    const uploadSingle = upload.single('profileImage');
    
    uploadSingle(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a file'
        });
      }
      
      // Update user profile with new image
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { profileImage: req.file.filename },
        { new: true }
      );
      
      res.status(200).json({
        success: true,
        data: user
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Set reading goal
// @route   PUT /api/users/reading-goal
// @access  Private
exports.setReadingGoal = async (req, res) => {
  try {
    const { year, target } = req.body;
    
    if (!year || !target) {
      return res.status(400).json({
        success: false,
        message: 'Please provide year and target number of books'
      });
    }
    
    // Count completed books for the current year
    const completedCount = await UserBook.countDocuments({
      user: req.user.id,
      status: 'read',
      finishedAt: {
        $gte: new Date(year, 0, 1),
        $lte: new Date(year, 11, 31)
      }
    });
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        readingGoal: {
          year,
          target,
          completed: completedCount
        }
      },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      data: user.readingGoal
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user's reading stats
// @route   GET /api/users/stats
// @access  Private
exports.getReadingStats = async (req, res) => {
  try {
    // Get total books by status
    const statusCounts = await UserBook.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    // Format into an object
    const statsByStatus = {};
    statusCounts.forEach(item => {
      statsByStatus[item._id] = item.count;
    });
    
    // Get books finished per month (for current year)
    const currentYear = new Date().getFullYear();
    const monthlyReads = await UserBook.aggregate([
      {
        $match: {
          user: req.user._id,
          status: 'read',
          finishedAt: {
            $gte: new Date(currentYear, 0, 1),
            $lte: new Date(currentYear, 11, 31)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$finishedAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        statsByStatus,
        monthlyReads
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Follow a user
// @route   PUT /api/users/:id/follow
// @access  Private
exports.followUser = async (req, res) => {
  try {
    // Check if user exists
    const userToFollow = await User.findById(req.params.id);
    
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if trying to follow self
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot follow yourself'
      });
    }
    
    // Check if already following
    const currentUser = await User.findById(req.user.id);
    if (currentUser.followingUsers.includes(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'You are already following this user'
      });
    }
    
    // Add to following and followers
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { followingUsers: req.params.id } }
    );
    
    await User.findByIdAndUpdate(
      req.params.id,
      { $push: { followers: req.user.id } }
    );
    
    res.status(200).json({
      success: true,
      message: 'User followed successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Unfollow a user
// @route   PUT /api/users/:id/unfollow
// @access  Private
exports.unfollowUser = async (req, res) => {
  try {
    // Check if user exists
    const userToUnfollow = await User.findById(req.params.id);
    
    if (!userToUnfollow) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Remove from following and followers
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { followingUsers: req.params.id } }
    );
    
    await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { followers: req.user.id } }
    );
    
    res.status(200).json({
      success: true,
      message: 'User unfollowed successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get users that current user is following
// @route   GET /api/users/following
// @access  Private
exports.getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('followingUsers', 'name profileImage');
    
    res.status(200).json({
      success: true,
      data: user.followingUsers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user's followers
// @route   GET /api/users/followers
// @access  Private
exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('followers', 'name profileImage');
    
    res.status(200).json({
      success: true,
      data: user.followers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}; 