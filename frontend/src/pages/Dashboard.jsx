import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  useTheme,
} from '@mui/material';
import {
  BookOutlined,
  Timeline,
  TrendingUp,
  Star,
  LocalFireDepartment,
  MenuBook,
  Group,
  AutoStories,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

const pageFlip = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(-180deg); }
`;

const Dashboard = () => {
  const theme = useTheme();
  const [readingStreak, setReadingStreak] = useState(12);
  const [booksRead, setBooksRead] = useState(47);
  const [pagesRead, setPagesRead] = useState(12543);
  const [yearlyGoalProgress, setYearlyGoalProgress] = useState(65);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  
  const recentActivity = [
    {
      type: 'Finished Reading',
      book: 'The Midnight Library',
      time: '2 hours ago',
      icon: <MenuBook />,
    },
    {
      type: 'Joined Group',
      book: 'Science Fiction Lovers',
      time: '5 hours ago',
      icon: <Group />,
    },
    {
      type: 'Started Reading',
      book: 'Project Hail Mary',
      time: '1 day ago',
      icon: <BookOutlined />,
    },
  ];

  const StatCard = ({ icon, title, value, subtitle }) => (
    <Card 
      sx={{ 
        height: '100%',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '3px',
          background: 'linear-gradient(to bottom, #8B4513, #DEB887)',
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton 
            size="small" 
            sx={{ 
              bgcolor: theme.palette.primary.main,
              mr: 1,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              }
            }}
          >
            {icon}
          </IconButton>
          <Typography 
            variant="h6" 
            sx={{ 
              color: theme.palette.text.primary,
              fontFamily: '"Playfair Display", serif',
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography 
          variant="h4" 
          sx={{ 
            color: theme.palette.primary.main,
            fontFamily: '"Libre Baskerville", serif',
            mb: 1 
          }}
        >
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {showAnimation && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            animation: `${pageFlip} 1.5s ease-in-out`,
          }}
        >
          <AutoStories
            sx={{
              fontSize: 100,
              color: theme.palette.primary.main,
            }}
          />
        </Box>
      )}
      
      <Box 
        sx={{ 
          mb: 6,
          textAlign: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '2px',
            background: 'linear-gradient(90deg, #DEB887, #8B4513, #DEB887)',
          }
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            color: theme.palette.primary.main,
            fontFamily: '"Playfair Display", serif',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
          }}
        >
          Your Reading Journey
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Reading Stats */}
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<BookOutlined sx={{ color: '#fff' }} />}
            title="Books Read"
            value={booksRead}
            subtitle="This year"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<Timeline sx={{ color: '#fff' }} />}
            title="Pages Read"
            value={pagesRead.toLocaleString()}
            subtitle="Total pages"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<LocalFireDepartment sx={{ color: '#fff' }} />}
            title="Reading Streak"
            value={`${readingStreak} days`}
            subtitle="Keep it up!"
          />
        </Grid>

        {/* Yearly Progress */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography 
                variant="h6"
                sx={{ 
                  fontFamily: '"Playfair Display", serif',
                  color: theme.palette.primary.dark,
                }}
              >
                Yearly Reading Goal
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ color: theme.palette.primary.main }}
              >
                {yearlyGoalProgress}% Complete
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={yearlyGoalProgress}
              sx={{ height: 8 }}
            />
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="body2" color="text.secondary">
                {booksRead} of 75 books
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Target: 75 books
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  fontFamily: '"Playfair Display", serif',
                  color: theme.palette.primary.dark,
                }}
              >
                Recent Activity
              </Typography>
              <List>
                {recentActivity.map((activity, index) => (
                  <Box key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ 
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.background.paper,
                          }}
                        >
                          {activity.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography 
                            variant="subtitle1"
                            sx={{ 
                              fontFamily: '"Libre Baskerville", serif',
                              color: theme.palette.text.primary,
                            }}
                          >
                            {activity.type}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography 
                              component="span" 
                              variant="body2" 
                              sx={{ 
                                color: theme.palette.primary.main,
                                fontStyle: 'italic',
                              }}
                            >
                              {activity.book}
                            </Typography>
                            {' — '}{activity.time}
                          </>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && (
                      <Divider 
                        variant="inset" 
                        component="li"
                        sx={{ 
                          borderColor: theme.palette.secondary.light,
                        }}
                      />
                    )}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            }}
          >
            <CardContent>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  fontFamily: '"Playfair Display", serif',
                  color: theme.palette.primary.dark,
                }}
              >
                Quick Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<BookOutlined />}
                  fullWidth
                >
                  Add New Book
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<TrendingUp />}
                  fullWidth
                >
                  Update Progress
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Star />}
                  fullWidth
                >
                  Rate Books
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 