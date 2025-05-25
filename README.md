# BookTracker - Your Personal Reading Companion

BookTracker is a full-stack MERN application that helps you track your reading journey, discover new books, and connect with fellow readers. Built with a sleek, monochrome design, it offers a modern and elegant user experience.

## Features

- **User Authentication & Profiles**
  - Secure signup/login with JWT
  - Customizable user profiles with reading stats
  - Profile pictures and bio

- **Book Management**
  - Add, update, and delete books
  - Comprehensive book details including cover images
  - Genre categorization

- **Reading Status Tracking**
  - Track reading progress
  - Set status (Want to Read, Currently Reading, Finished Reading)
  - Page progress tracking

- **Bookshelves**
  - Create custom bookshelves
  - Organize books by categories
  - Default shelves for common categories

- **Reviews & Ratings**
  - Rate books on a 5-star scale
  - Write detailed reviews
  - View other users' reviews

- **Reading Stats & Analytics**
  - Visual reading progress
  - Genre distribution charts
  - Reading goals tracking

## Tech Stack

- **Frontend**
  - React
  - Material-UI
  - Chart.js
  - React Router
  - Axios

- **Backend**
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication
  - Mongoose

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/book-tracker.git
   cd book-tracker
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/book-tracker
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Books
- GET `/api/books` - Get all books (with filters)
- GET `/api/books/:id` - Get single book
- POST `/api/books` - Create new book
- PUT `/api/books/:id` - Update book
- DELETE `/api/books/:id` - Delete book

### Reviews
- POST `/api/books/:id/reviews` - Add review
- PUT `/api/books/:id/reviews/:reviewId` - Update review
- DELETE `/api/books/:id/reviews/:reviewId` - Delete review

### Shelves
- GET `/api/shelves` - Get user's shelves
- POST `/api/shelves` - Create new shelf
- PUT `/api/shelves/:id` - Update shelf
- DELETE `/api/shelves/:id` - Delete shelf
- POST `/api/shelves/:id/books` - Add book to shelf

### User
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update user profile
- GET `/api/users/stats` - Get user reading stats

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the beautiful components
- Chart.js for the statistics visualizations
- The MERN stack community for excellent documentation and resources 