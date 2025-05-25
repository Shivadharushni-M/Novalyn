import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';
import BookDetails from '../pages/BookDetails';
import Dashboard from '../pages/Dashboard';
import ReadingGoals from '../components/ReadingGoals';
import Social from '../components/Social';
import Recommendations from '../pages/Recommendations';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/explore" element={<Explore />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/book/:id"
        element={
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/goals"
        element={
          <PrivateRoute>
            <ReadingGoals />
          </PrivateRoute>
        }
      />
      <Route
        path="/social"
        element={
          <PrivateRoute>
            <Social />
          </PrivateRoute>
        }
      />
      <Route
        path="/recommendations"
        element={
          <PrivateRoute>
            <Recommendations />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes; 