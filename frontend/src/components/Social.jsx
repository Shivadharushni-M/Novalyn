import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Avatar,
  Button,
  Stack,
  Chip,
  IconButton,
  useTheme,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Message as MessageIcon,
  PersonAdd as PersonAddIcon,
  BookmarkAdd as BookmarkIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { cardStyles, gradientText } from '../styles/commonStyles';

const Social = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const readers = [
    {
      id: 1,
      name: 'Sarah Parker',
      avatar: 'https://i.pravatar.cc/150?img=1',
      bio: 'Fantasy & Sci-Fi enthusiast | 100 books/year',
      currentlyReading: 'Dune by Frank Herbert',
      genres: ['Fantasy', 'Science Fiction', 'Mystery'],
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      bio: 'Book reviewer | Literary Fiction lover',
      currentlyReading: 'The Midnight Library by Matt Haig',
      genres: ['Literary Fiction', 'Contemporary', 'Classics'],
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      bio: 'YA & Romance reader | Bookstagrammer',
      currentlyReading: 'Six of Crows by Leigh Bardugo',
      genres: ['Young Adult', 'Romance', 'Fantasy'],
    },
  ];

  const readingGroups = [
    {
      id: 1,
      name: 'Fantasy Book Club',
      members: 234,
      currentBook: 'The Name of the Wind',
      nextMeeting: '2024-04-15',
    },
    {
      id: 2,
      name: 'Mystery Lovers',
      members: 156,
      currentBook: 'The Silent Patient',
      nextMeeting: '2024-04-18',
    },
    {
      id: 3,
      name: 'Classic Literature',
      members: 189,
      currentBook: 'Pride and Prejudice',
      nextMeeting: '2024-04-20',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={gradientText(theme)}>
        Connect with Readers
      </Typography>

      {/* Search Bar */}
      <Card sx={{ ...cardStyles(theme), p: 2, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search readers by name, genre, or current book..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
            },
          }}
        />
      </Card>

      {/* Reading Groups */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Reading Groups
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        {readingGroups.map((group) => (
          <Card
            key={group.id}
            sx={{
              ...cardStyles(theme),
              p: 3,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h6">{group.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {group.members} members
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Currently Reading
              </Typography>
              <Typography variant="body1">{group.currentBook}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Next Meeting
              </Typography>
              <Typography variant="body1">
                {new Date(group.nextMeeting).toLocaleDateString()}
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                mt: 'auto',
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: 'background.elevated',
                },
              }}
            >
              Join Group
            </Button>
          </Card>
        ))}
      </Stack>

      {/* Readers */}
      <Typography variant="h5" gutterBottom>
        Recommended Readers
      </Typography>
      <Stack spacing={3}>
        {readers.map((reader) => (
          <Card
            key={reader.id}
            sx={{
              ...cardStyles(theme),
              p: 3,
            }}
          >
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Avatar
                src={reader.avatar}
                sx={{ width: 80, height: 80 }}
              />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6">{reader.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {reader.bio}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small">
                      <MessageIcon />
                    </IconButton>
                    <IconButton size="small">
                      <PersonAddIcon />
                    </IconButton>
                    <IconButton size="small">
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Currently Reading
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {reader.currentlyReading}
                    <IconButton size="small">
                      <BookmarkIcon />
                    </IconButton>
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  {reader.genres.map((genre) => (
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
              </Box>
            </Box>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Social;