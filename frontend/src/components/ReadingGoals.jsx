import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  useTheme,
  Stack,
  Tooltip,
  Grid,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  EmojiEvents as TrophyIcon,
  LocalLibrary as BookIcon,
  Timeline as TimelineIcon,
  Speed as SpeedIcon,
  Whatshot as StreakIcon,
  AccessTime as TimeIcon,
  CalendarMonth as CalendarIcon,
  Grade as AchievementIcon,
} from '@mui/icons-material';
import { cardStyles, progressBarStyles, gradientText, animatedGradientBorder } from '../styles/commonStyles';

const ReadingGoals = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [goals, setGoals] = useState({
    yearly: { target: 24, current: 8 },
    monthly: { target: 2, current: 1 },
    daily: { target: 30, current: 15 }, // minutes
  });
  const [editingGoal, setEditingGoal] = useState({
    type: '',
    target: 0,
  });

  const achievements = [
    {
      title: '7-Day Streak',
      description: 'Read every day for a week',
      progress: 100,
      completed: true,
    },
    {
      title: 'Speed Reader',
      description: 'Read 300+ words per minute',
      progress: 83,
      completed: false,
    },
    {
      title: 'Bookworm',
      description: 'Read 5 books in a month',
      progress: 40,
      completed: false,
    },
    {
      title: 'Genre Explorer',
      description: 'Read books from 5 different genres',
      progress: 60,
      completed: false,
    },
  ];

  const readingStats = {
    totalBooksRead: 47,
    totalPagesRead: 12543,
    totalReadingTime: 156, // hours
    averageRating: 4.2,
    favoriteGenres: ['Fantasy', 'Science Fiction', 'Mystery'],
    longestStreak: 15, // days
    currentStreak: 12, // days
  };

  const handleOpenDialog = (type, target) => {
    setEditingGoal({ type, target });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveGoal = () => {
    setGoals(prev => ({
      ...prev,
      [editingGoal.type]: {
        ...prev[editingGoal.type],
        target: parseInt(editingGoal.target),
      },
    }));
    handleCloseDialog();
  };

  const calculateProgress = (current, target) => (current / target) * 100;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={gradientText(theme)}>
        Reading Goals
      </Typography>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            title: 'Reading Streak',
            value: `${readingStats.currentStreak} days`,
            icon: <StreakIcon />,
            color: theme.palette.primary.main,
            subtitle: `Longest: ${readingStats.longestStreak} days`,
          },
          {
            title: 'Total Books',
            value: readingStats.totalBooksRead,
            icon: <BookIcon />,
            color: theme.palette.primary.light,
            subtitle: `${readingStats.totalPagesRead} pages read`,
          },
          {
            title: 'Reading Time',
            value: `${readingStats.totalReadingTime}h`,
            icon: <TimeIcon />,
            color: theme.palette.primary.dark,
            subtitle: '~250 words per minute',
          },
        ].map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                ...cardStyles(theme),
                p: 3,
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: '50%',
                    bgcolor: `${stat.color}20`,
                    color: stat.color,
                    display: 'flex',
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.subtitle}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Goals Progress */}
      <Card sx={{ ...cardStyles(theme), p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarIcon sx={{ color: theme.palette.primary.main }} />
          Reading Goals Progress
        </Typography>

        <Stack spacing={3}>
          {/* Yearly Goal */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1">
                Yearly Goal
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {goals.yearly.current} / {goals.yearly.target} books
                </Typography>
                <Tooltip title="Edit goal">
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog('yearly', goals.yearly.target)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={calculateProgress(goals.yearly.current, goals.yearly.target)}
              sx={progressBarStyles(theme)}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              On track to read {Math.round(goals.yearly.current * (12 / new Date().getMonth()))} books this year
            </Typography>
          </Box>

          {/* Monthly Goal */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1">
                Monthly Goal
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {goals.monthly.current} / {goals.monthly.target} books
                </Typography>
                <Tooltip title="Edit goal">
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog('monthly', goals.monthly.target)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={calculateProgress(goals.monthly.current, goals.monthly.target)}
              sx={progressBarStyles(theme)}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {Math.ceil((new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate()) / (goals.monthly.target - goals.monthly.current))} days per book to reach goal
            </Typography>
          </Box>

          {/* Daily Reading Time */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1">
                Daily Reading Time
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {goals.daily.current} / {goals.daily.target} minutes
                </Typography>
                <Tooltip title="Edit goal">
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog('daily', goals.daily.target)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={calculateProgress(goals.daily.current, goals.daily.target)}
              sx={progressBarStyles(theme)}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {goals.daily.target - goals.daily.current} minutes left to reach today's goal
            </Typography>
          </Box>
        </Stack>
      </Card>

      {/* Achievements */}
      <Card sx={{ ...cardStyles(theme), p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AchievementIcon sx={{ color: theme.palette.primary.main }} />
          Reading Achievements
        </Typography>
        <Grid container spacing={2}>
          {achievements.map((achievement, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                sx={{
                  ...cardStyles(theme),
                  p: 2,
                  bgcolor: 'background.elevated',
                  ...(achievement.completed && animatedGradientBorder(theme)),
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <TrophyIcon
                    sx={{
                      color: achievement.completed
                        ? theme.palette.primary.main
                        : theme.palette.text.disabled,
                    }}
                  />
                  <Box>
                    <Typography variant="body1">{achievement.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {achievement.description}
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={achievement.progress}
                  sx={progressBarStyles(theme)}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* Edit Goal Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit {editingGoal.type?.charAt(0).toUpperCase() + editingGoal.type?.slice(1)} Goal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Target"
            type="number"
            fullWidth
            value={editingGoal.target}
            onChange={(e) => setEditingGoal(prev => ({ ...prev, target: e.target.value }))}
            InputProps={{
              endAdornment: <Typography variant="body2">{editingGoal.type === 'daily' ? 'minutes' : 'books'}</Typography>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveGoal} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReadingGoals;