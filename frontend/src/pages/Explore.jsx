import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  Paper,
  Tab,
  Tabs,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  TrendingUp as TrendingUpIcon,
  NewReleases as NewReleasesIcon,
  Star as StarIcon,
} from '@mui/icons-material';

// Static data for featured books
const featuredBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
    rating: 4.2,
    genre: "Fiction",
    isBookmarked: false,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg",
    rating: 4.5,
    genre: "Self-Help",
    isBookmarked: true,
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg",
    rating: 4.8,
    genre: "Sci-Fi",
    isBookmarked: false,
  },
  {
    id: 4,
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1647789287i/58784475.jpg",
    rating: 4.3,
    genre: "Literary Fiction",
    isBookmarked: false,
  },
];

// Static data for trending topics
const trendingTopics = [
  "Fantasy", "Mystery", "Romance", "Science Fiction",
  "Biography", "History", "Self-Help", "Business"
];

const Explore = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState(
    featuredBooks.reduce((acc, book) => ({ ...acc, [book.id]: book.isBookmarked }), {})
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleBookmark = (bookId) => {
    setBookmarks(prev => ({
      ...prev,
      [bookId]: !prev[bookId]
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: `linear-gradient(45deg, ${theme.palette.background.paper}, ${theme.palette.background.elevated})`,
          borderRadius: theme.shape.borderRadius * 2,
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Discover Your Next Great Read
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Explore curated collections, trending books, and personalized recommendations
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search books, authors, or genres..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            sx: {
              bgcolor: alpha(theme.palette.background.paper, 0.6),
              '&:hover': {
                bgcolor: alpha(theme.palette.background.paper, 0.8),
              },
            },
          }}
        />
      </Paper>

      {/* Trending Topics */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Trending Topics
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {trendingTopics.map((topic) => (
            <Chip
              key={topic}
              label={topic}
              clickable
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Featured Books Tabs */}
      <Box sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            mb: 3,
            '& .MuiTab-root': {
              minWidth: 120,
            },
          }}
        >
          <Tab icon={<TrendingUpIcon />} label="Trending" />
          <Tab icon={<NewReleasesIcon />} label="New Releases" />
          <Tab icon={<StarIcon />} label="Top Rated" />
        </Tabs>

        <Grid container spacing={3}>
          {featuredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={3} key={book.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: theme.palette.background.elevated,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={book.cover}
                  alt={book.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h6" component="div" noWrap>
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {book.author}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => toggleBookmark(book.id)}
                      sx={{ color: theme.palette.primary.main }}
                    >
                      {bookmarks[book.id] ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                  </Box>
                  <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={book.genre}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <StarIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                      <Typography variant="body2">{book.rating}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Explore; 