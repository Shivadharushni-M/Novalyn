import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Rating,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Bookmark as BookmarkIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import axios from 'axios';

const readingStatuses = [
  { value: 'want_to_read', label: 'Want to Read' },
  { value: 'currently_reading', label: 'Currently Reading' },
  { value: 'read', label: 'Read' },
];

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [readingStatus, setReadingStatus] = useState('');
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/books/${id}`);
      setBook(response.data);
      setReadingStatus(response.data.userStatus || '');
      setUserRating(response.data.userRating || 0);
    } catch (err) {
      setError('Failed to fetch book details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (event) => {
    try {
      const newStatus = event.target.value;
      await axios.post(`/api/books/${id}/status`, { status: newStatus });
      setReadingStatus(newStatus);
    } catch (err) {
      console.error('Failed to update reading status:', err);
    }
  };

  const handleRatingChange = async (event, newValue) => {
    try {
      await axios.post(`/api/books/${id}/rating`, { rating: newValue });
      setUserRating(newValue);
    } catch (err) {
      console.error('Failed to update rating:', err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!book) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={book.coverImage}
              alt={book.title}
              sx={{
                width: '100%',
                maxWidth: 300,
                height: 'auto',
                borderRadius: 1,
                mb: 2,
              }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Reading Status</InputLabel>
              <Select
                value={readingStatus}
                onChange={handleStatusChange}
                label="Reading Status"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {readingStatuses.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ width: '100%', mb: 2 }}>
              <Typography component="legend">Your Rating</Typography>
              <Rating
                value={userRating}
                onChange={handleRatingChange}
                size="large"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              by {book.author}
            </Typography>

            <Box sx={{ my: 2 }}>
              {book.genres.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  sx={{ mr: 1, mb: 1 }}
                  size="small"
                />
              ))}
            </Box>

            <Box sx={{ my: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Rating value={book.averageRating} readOnly precision={0.5} />
              <Typography variant="body2" color="text.secondary">
                {book.averageRating} ({book.ratingsCount} ratings)
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" paragraph>
              {book.description}
            </Typography>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<BookmarkIcon />}
                onClick={() => {}}
              >
                Add to Shelf
              </Button>
              <Button
                variant="outlined"
                startIcon={<CommentIcon />}
                onClick={() => {}}
              >
                Review
              </Button>
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                onClick={() => {}}
              >
                Share
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetails; 