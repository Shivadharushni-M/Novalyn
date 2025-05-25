import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Stack,
  Chip,
  Rating,
  Button,
  IconButton,
  useTheme,
  Grid,
  Avatar,
} from '@mui/material';
import {
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
  ArrowForward as ArrowForwardIcon,
  LocalLibrary as BookIcon,
} from '@mui/icons-material';
import { cardStyles, gradientText } from '../styles/commonStyles';

const Recommendations = () => {
  const theme = useTheme();
  const [selectedGenres, setSelectedGenres] = useState(['Fantasy', 'Science Fiction']);

  const genres = [
    'Fantasy',
    'Science Fiction',
    'Mystery',
    'Romance',
    'Literary Fiction',
    'Historical Fiction',
    'Young Adult',
    'Thriller',
    'Non-Fiction',
    'Biography',
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg',
      rating: 4.5,
      genres: ['Science Fiction', 'Adventure'],
      description: 'A lone astronaut must save humanity from extinction in this thrilling interstellar adventure.',
      matchScore: 98,
    },
    {
      id: 2,
      title: 'The Way of Kings',
      author: 'Brandon Sanderson',
      cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1659905828i/7235533.jpg',
      rating: 4.8,
      genres: ['Fantasy', 'Epic'],
      description: 'An epic fantasy of war, magic, and destiny in a richly imagined world.',
      matchScore: 95,
    },
    {
      id: 3,
      title: 'Klara and the Sun',
      author: 'Kazuo Ishiguro',
      cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603206535i/54120408.jpg',
      rating: 4.2,
      genres: ['Literary Fiction', 'Science Fiction'],
      description: 'A thought-provoking tale of artificial intelligence and human connection.',
      matchScore: 92,
    },
  ];

  const handleGenreToggle = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={gradientText(theme)}>
        Personalized Recommendations
      </Typography>

      {/* Genre Selection */}
      <Card sx={{ ...cardStyles(theme), p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Your Preferred Genres
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {genres.map((genre) => (
            <Chip
              key={genre}
              label={genre}
              onClick={() => handleGenreToggle(genre)}
              sx={{
                bgcolor: selectedGenres.includes(genre)
                  ? 'primary.main'
                  : 'background.elevated',
                color: selectedGenres.includes(genre)
                  ? 'background.default'
                  : 'text.primary',
                '&:hover': {
                  bgcolor: selectedGenres.includes(genre)
                    ? 'primary.dark'
                    : 'background.paper',
                },
              }}
            />
          ))}
        </Box>
      </Card>

      {/* Top Picks */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Top Picks for You
        </Typography>
        <Grid container spacing={3}>
          {recommendations.map((book) => (
            <Grid item xs={12} md={4} key={book.id}>
              <Card
                sx={{
                  ...cardStyles(theme),
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '150%',
                    overflow: 'hidden',
                    borderRadius: '16px 16px 0 0',
                  }}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      bgcolor: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: '12px',
                      px: 1.5,
                      py: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <BookIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">
                      {book.matchScore}% Match
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    by {book.author}
                  </Typography>
                  <Rating value={book.rating} precision={0.5} readOnly sx={{ mb: 2 }} />
                  <Typography variant="body2" sx={{ mb: 2, flex: 1 }}>
                    {book.description}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    {book.genres.map((genre) => (
                      <Chip
                        key={genre}
                        label={genre}
                        size="small"
                        sx={{
                          bgcolor: 'background.elevated',
                          '&:hover': { bgcolor: 'background.paper' },
                        }}
                      />
                    ))}
                  </Stack>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'background.elevated' },
                      }}
                    >
                      Learn More
                    </Button>
                    <Box>
                      <IconButton size="small">
                        <BookmarkIcon />
                      </IconButton>
                      <IconButton size="small">
                        <ShareIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Reading Lists */}
      <Typography variant="h5" gutterBottom>
        Curated Reading Lists
      </Typography>
      <Stack spacing={3}>
        {[
          {
            title: 'Best Science Fiction of 2024',
            curator: 'Sci-Fi Monthly',
            books: 12,
            avatar: 'https://i.pravatar.cc/150?img=4',
          },
          {
            title: 'Award-Winning Fantasy Debuts',
            curator: 'Fantasy Book Club',
            books: 8,
            avatar: 'https://i.pravatar.cc/150?img=5',
          },
          {
            title: 'Must-Read Contemporary Novels',
            curator: 'Modern Reads',
            books: 15,
            avatar: 'https://i.pravatar.cc/150?img=6',
          },
        ].map((list, index) => (
          <Card
            key={index}
            sx={{
              ...cardStyles(theme),
              p: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={list.avatar} />
                <Box>
                  <Typography variant="h6">{list.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Curated by {list.curator} • {list.books} books
                  </Typography>
                </Box>
              </Box>
              <Button
                endIcon={<ArrowForwardIcon />}
                sx={{
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'background.elevated' },
                }}
              >
                View List
              </Button>
            </Box>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Recommendations; 