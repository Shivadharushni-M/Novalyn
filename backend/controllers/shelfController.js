const Shelf = require('../models/Shelf');
const UserBook = require('../models/UserBook');

// @desc    Create a new shelf
// @route   POST /api/shelves
// @access  Private
exports.createShelf = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a name for the shelf'
      });
    }
    
    // Check if shelf with same name exists for user
    const existingShelf = await Shelf.findOne({
      user: req.user.id,
      name: { $regex: new RegExp(`^${name}$`, 'i') } // Case insensitive match
    });
    
    if (existingShelf) {
      return res.status(400).json({
        success: false,
        message: 'A shelf with this name already exists'
      });
    }
    
    // Create shelf
    const shelf = await Shelf.create({
      name,
      description,
      user: req.user.id
    });
    
    res.status(201).json({
      success: true,
      data: shelf
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all shelves for a user
// @route   GET /api/shelves
// @access  Private
exports.getShelves = async (req, res) => {
  try {
    const shelves = await Shelf.find({ user: req.user.id });
    
    // Get book count for each shelf
    const shelvesWithCount = await Promise.all(
      shelves.map(async (shelf) => {
        const count = await UserBook.countDocuments({
          user: req.user.id,
          shelves: shelf._id
        });
        
        return {
          ...shelf.toObject(),
          bookCount: count
        };
      })
    );
    
    res.status(200).json({
      success: true,
      count: shelves.length,
      data: shelvesWithCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single shelf
// @route   GET /api/shelves/:id
// @access  Private
exports.getShelf = async (req, res) => {
  try {
    const shelf = await Shelf.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!shelf) {
      return res.status(404).json({
        success: false,
        message: 'Shelf not found'
      });
    }
    
    // Get books in this shelf
    const books = await UserBook.find({
      user: req.user.id,
      shelves: shelf._id
    }).populate('book');
    
    res.status(200).json({
      success: true,
      data: {
        shelf,
        books
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

// @desc    Update shelf
// @route   PUT /api/shelves/:id
// @access  Private
exports.updateShelf = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updateData = {};
    
    if (name) {
      // Check if another shelf with this name exists
      const existingShelf = await Shelf.findOne({
        user: req.user.id,
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: req.params.id }
      });
      
      if (existingShelf) {
        return res.status(400).json({
          success: false,
          message: 'A shelf with this name already exists'
        });
      }
      
      updateData.name = name;
    }
    
    if (description !== undefined) {
      updateData.description = description;
    }
    
    // Find and update shelf
    const shelf = await Shelf.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
        isDefault: { $ne: true } // Prevent updating default shelves
      },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!shelf) {
      return res.status(404).json({
        success: false,
        message: 'Shelf not found or cannot be modified'
      });
    }
    
    res.status(200).json({
      success: true,
      data: shelf
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete shelf
// @route   DELETE /api/shelves/:id
// @access  Private
exports.deleteShelf = async (req, res) => {
  try {
    // Find shelf
    const shelf = await Shelf.findOne({
      _id: req.params.id,
      user: req.user.id,
      isDefault: { $ne: true } // Prevent deleting default shelves
    });
    
    if (!shelf) {
      return res.status(404).json({
        success: false,
        message: 'Shelf not found or cannot be deleted'
      });
    }
    
    // Remove shelf from all userBooks
    await UserBook.updateMany(
      { user: req.user.id, shelves: shelf._id },
      { $pull: { shelves: shelf._id } }
    );
    
    // Delete shelf
    await shelf.remove();
    
    res.status(200).json({
      success: true,
      message: 'Shelf removed'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Add book to shelf
// @route   PUT /api/shelves/:id/books/:bookId
// @access  Private
exports.addBookToShelf = async (req, res) => {
  try {
    // Check if shelf exists and belongs to user
    const shelf = await Shelf.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!shelf) {
      return res.status(404).json({
        success: false,
        message: 'Shelf not found'
      });
    }
    
    // Check if userBook exists
    const userBook = await UserBook.findOne({
      _id: req.params.bookId,
      user: req.user.id
    });
    
    if (!userBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found in your collection'
      });
    }
    
    // Check if book is already in shelf
    if (userBook.shelves.includes(shelf._id)) {
      return res.status(400).json({
        success: false,
        message: 'Book is already in this shelf'
      });
    }
    
    // Add shelf to userBook
    userBook.shelves.push(shelf._id);
    await userBook.save();
    
    res.status(200).json({
      success: true,
      message: 'Book added to shelf'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Remove book from shelf
// @route   DELETE /api/shelves/:id/books/:bookId
// @access  Private
exports.removeBookFromShelf = async (req, res) => {
  try {
    // Check if shelf exists and belongs to user
    const shelf = await Shelf.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!shelf) {
      return res.status(404).json({
        success: false,
        message: 'Shelf not found'
      });
    }
    
    // Update userBook
    const result = await UserBook.updateOne(
      {
        _id: req.params.bookId,
        user: req.user.id
      },
      {
        $pull: { shelves: shelf._id }
      }
    );
    
    if (result.nModified === 0) {
      return res.status(404).json({
        success: false,
        message: 'Book not found in this shelf'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Book removed from shelf'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}; 