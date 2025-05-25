import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  PersonRemove as PersonRemoveIcon,
  Book as BookIcon,
  Star as StarIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';
import axios from 'axios';

const Social = () => {
  const [loading, setLoading] = useState(true);
  const [activityFeed, setActivityFeed] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSocialData();
  }, []);

  const fetchSocialData = async () => {
    try {
      setLoading(true);
      const [activityRes, suggestedRes, followingRes] = await Promise.all([
        axios.get('/api/social/activity'),
        axios.get('/api/social/suggested-users'),
        axios.get('/api/social/following'),
      ]);
      setActivityFeed(activityRes.data);
      setSuggestedUsers(suggestedRes.data);
      setFollowing(followingRes.data);
    } catch (err) {
      console.error('Failed to fetch social data:', err);
      setError('Failed to load social data');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await axios.post(`/api/social/follow/${userId}`);
      fetchSocialData();
    } catch (err) {
      setError('Failed to follow user');
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await axios.post(`/api/social/unfollow/${userId}`);
      fetchSocialData();
    } catch (err) {
      setError('Failed to unfollow user');
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'read':
        return <BookIcon color="primary" />;
      case 'rate':
        return <StarIcon color="warning" />;
      case 'review':
        return <CommentIcon color="info" />;
      default:
        return <BookIcon />;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Activity Feed */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Activity Feed
            </Typography>
            <List>
              {activityFeed.map((activity) => (
                <Box key={activity.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={activity.user.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography>
                          <strong>{activity.user.name}</strong> {activity.action}
                        </Typography>
                      }
                      secondary={activity.timestamp}
                    />
                    {getActivityIcon(activity.type)}
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Suggested Users */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Suggested Readers
            </Typography>
            <List>
              {suggestedUsers.map((user) => (
                <ListItem
                  key={user.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleFollow(user.id)}
                      color="primary"
                    >
                      <PersonAddIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={`${user.booksRead} books read`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Following */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              Following
            </Typography>
            <List>
              {following.map((user) => (
                <ListItem
                  key={user.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleUnfollow(user.id)}
                      color="error"
                    >
                      <PersonRemoveIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Social; 