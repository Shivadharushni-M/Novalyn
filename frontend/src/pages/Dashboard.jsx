import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Book as BookIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    currentlyReading: [],
    monthlyStats: [],
    yearlyGoal: {
      target: 0,
      current: 0,
    },
    recentlyFinished: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
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
    <div className={styles.dashboardContainer}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Reading Progress */}
          <Grid item xs={12} md={8}>
            <div className={styles.statsCard}>
              <div className={styles.sectionHeader}>
                <Typography variant="h5" className={styles.sectionTitle}>
                  Reading Progress
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<TimelineIcon />}
                  onClick={() => navigate('/goals')}
                >
                  View Goals
                </Button>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="books" fill="#6B4EE0" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Grid>

          {/* Yearly Goal Progress */}
          <Grid item xs={12} md={4}>
            <div className={styles.statsCard}>
              <Typography variant="h5" className={styles.sectionTitle}>
                Yearly Goal
              </Typography>
              <div className={styles.progressCircle}>
                <CircularProgress
                  variant="determinate"
                  value={(stats.yearlyGoal.current / stats.yearlyGoal.target) * 100}
                  size={120}
                  thickness={4}
                />
                <Typography variant="h4" className={styles.progressValue}>
                  {stats.yearlyGoal.current} / {stats.yearlyGoal.target}
                </Typography>
              </div>
              <Typography variant="body2" color="text.secondary" className="text-center mt-3">
                books read this year
              </Typography>
            </div>
          </Grid>

          {/* Currently Reading */}
          <Grid item xs={12} md={6}>
            <div className={styles.statsCard}>
              <Typography variant="h5" className={styles.sectionTitle}>
                Currently Reading
              </Typography>
              <List className={styles.bookList}>
                {stats.currentlyReading.map((book) => (
                  <div key={book._id}>
                    <ListItem
                      button
                      onClick={() => navigate(`/book/${book._id}`)}
                      className={styles.bookItem}
                    >
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          src={book.coverImage}
                          alt={book.title}
                          className={styles.bookCover}
                        >
                          <BookIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<div className={styles.bookTitle}>{book.title}</div>}
                        secondary={
                          <div className={styles.bookAuthor}>
                            by {book.author} - {book.progress}% complete
                          </div>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </div>
          </Grid>

          {/* Recently Finished */}
          <Grid item xs={12} md={6}>
            <div className={styles.statsCard}>
              <Typography variant="h5" className={styles.sectionTitle}>
                Recently Finished
              </Typography>
              <List className={styles.bookList}>
                {stats.recentlyFinished.map((book) => (
                  <div key={book._id}>
                    <ListItem
                      button
                      onClick={() => navigate(`/book/${book._id}`)}
                      className={styles.bookItem}
                    >
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          src={book.coverImage}
                          alt={book.title}
                          className={styles.bookCover}
                        >
                          <StarIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<div className={styles.bookTitle}>{book.title}</div>}
                        secondary={
                          <div className={styles.bookAuthor}>
                            by {book.author} - Finished {book.finishedDate}
                          </div>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard; 