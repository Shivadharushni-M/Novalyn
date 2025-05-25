const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');

// Routes
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const userRoutes = require('./routes/user.routes');
const shelfRoutes = require('./routes/shelf.routes');
const reviewRoutes = require('./routes/review.routes');
const socialRoutes = require('./routes/social');
const recommendationRoutes = require('./routes/recommendations');

// Config
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Add logging

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://dharushni10:1234@cluster0.thz0frh.mongodb.net/novalyn?retryWrites=true&w=majority&appName=Cluster0';
const PORT = process.env.PORT || 5001;

// Configure Mongoose
mongoose.set('strictQuery', false);
mongoose.set('debug', process.env.NODE_ENV === 'development');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Increased timeout to 10s
      socketTimeoutMS: 45000, // Increased socket timeout
      family: 4, // Use IPv4, skip trying IPv6
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // More detailed error logging
    if (error.name === 'MongoServerSelectionError') {
      console.error('Could not connect to MongoDB. Please check:');
      console.error('1. Your network connection');
      console.error('2. MongoDB Atlas whitelist settings (Add your IP address in Network Access)');
      console.error('3. Username and password are correct');
      console.error('4. Database name is correct');
      console.error('Error details:', error.message);
    }
    process.exit(1);
  }
};

// Call the connect function
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shelves', shelfRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Novalyn API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port or close the application using this port.`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
}); 