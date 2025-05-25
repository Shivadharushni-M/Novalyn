import { alpha } from '@mui/material/styles';
import './global.css';

export const cardStyles = (theme) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.elevated, 0.9)})`,
  backdropFilter: 'blur(10px)',
  borderRadius: 0,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.2)}`,
  },
});

export const gradientText = (theme) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

export const glassBackground = (theme) => ({
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(10px)',
  borderRadius: 0,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
});

export const progressBarStyles = (theme) => ({
  height: 8,
  borderRadius: 0,
  '& .MuiLinearProgress-bar': {
    borderRadius: 0,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.light, 0.8)})`,
  },
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
});

export const animatedGradientBorder = (theme) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -2,
    borderRadius: 0,
    padding: 2,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0.5,
  },
}); 