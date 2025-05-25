import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Stack,
  useTheme,
} from '@mui/material';
import {
  MenuBook as MenuBookIcon,
  People as PeopleIcon,
  Timeline as TimelineIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const features = [
  {
    icon: MenuBookIcon,
    title: 'Track Your Reading',
    description: 'Keep track of your books, reading progress, and create custom bookshelves.',
  },
  {
    icon: PeopleIcon,
    title: 'Connect with Readers',
    description: 'Follow other readers, share your thoughts, and discover new books through friends.',
  },
  {
    icon: TimelineIcon,
    title: 'Set Reading Goals',
    description: 'Set yearly and monthly reading goals, and track your progress over time.',
  },
  {
    icon: LightbulbIcon,
    title: 'Get Recommendations',
    description: 'Receive personalized book recommendations based on your reading history.',
  },
];

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: { xs: 8, md: 12 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Your Social Reading Companion
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, color: 'primary.contrastText' }}
              >
                Track your reading journey, connect with fellow readers, and discover your next favorite book.
              </Typography>
              {!user && (
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={() => navigate('/register')}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ color: 'white', borderColor: 'white' }}
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </Button>
                </Stack>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src="/hero-image.svg"
                alt="Reading illustration"
                sx={{ maxWidth: '100%', height: 'auto' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose Novalyn?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Icon
                      sx={{
                        fontSize: 48,
                        color: 'primary.main',
                        mb: 2,
                      }}
                    />
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                      sx={{ fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                  {user && (
                    <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                      <Button
                        size="small"
                        onClick={() =>
                          navigate(
                            feature.title === 'Track Your Reading'
                              ? '/dashboard'
                              : feature.title === 'Connect with Readers'
                              ? '/social'
                              : feature.title === 'Set Reading Goals'
                              ? '/goals'
                              : '/recommendations'
                          )
                        }
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Call to Action */}
      {!user && (
        <Box sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', py: 8 }}>
          <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
              Ready to Start Your Reading Journey?
            </Typography>
            <Typography variant="h6" align="center" paragraph>
              Join thousands of readers who are already tracking their books, connecting with friends,
              and discovering new stories.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  bgcolor: 'white',
                  color: 'secondary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                Join Novalyn Today
              </Button>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default Home; 