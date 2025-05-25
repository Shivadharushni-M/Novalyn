const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let uploadPath = '';
    
    // Check file type and set destination accordingly
    if (file.fieldname === 'profileImage') {
      uploadPath = 'uploads/profiles';
    } else if (file.fieldname === 'coverImage') {
      uploadPath = 'uploads/covers';
    } else {
      uploadPath = 'uploads/misc';
    }
    
    cb(null, path.join(__dirname, '..', uploadPath));
  },
  filename: function(req, file, cb) {
    // Create unique filename using timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Check file type
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB max
  fileFilter: fileFilter
});

module.exports = upload; 