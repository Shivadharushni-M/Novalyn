// Enhanced Library Theme Configuration
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F5E6D3', // Aged ivory
      light: '#FAF0E6', // Light parchment
      dark: '#E6D7C3', // Darker ivory
      contrastText: '#0F0A06',
    },
    secondary: {
      main: '#8B4513', // Saddle brown
      light: '#A0522D', // Sienna
      dark: '#654321', // Dark brown
      contrastText: '#F5E6D3',
    },
    accent: {
      gold: '#D4AF37', // Old gold
      copper: '#B87333', // Bronze/copper
      brass: '#B5A642', // Antique brass
    },
    background: {
      default: '#0F0A06', // Deepest black-brown
      paper: '#1A1208', // Dark chocolate leather
      elevated: '#2D1B0E', // Rich dark brown
      luxury: '#3C2414', // Medium brown leather
    },
    text: {
      primary: '#F5E6D3', // Ivory text
      secondary: '#D4C5A9', // Muted ivory
      disabled: '#8D7B6A', // Brownish gray
      accent: '#D4AF37', // Gold accent text
    },
    leather: {
      dark: '#2C1810', // Dark leather
      medium: '#3D2818', // Medium leather
      light: '#4F3520', // Light leather
    },
    wood: {
      dark: '#3C2415', // Dark mahogany
      medium: '#5D3A22', // Medium walnut
      light: '#8B5A2B', // Light oak
    },
    divider: 'rgba(212, 175, 55, 0.15)', // Gold divider
    error: {
      main: '#D2691E', // Chocolate orange for errors
      light: '#F4A460', // Sandy brown
      dark: '#A0522D', // Darker sienna
    },
    warning: {
      main: '#DAA520', // Goldenrod
      light: '#F0E68C', // Khaki
      dark: '#B8860B', // Dark goldenrod
    },
    info: {
      main: '#CD853F', // Peru
      light: '#DEB887', // Burlywood
      dark: '#8B7355', // Dark khaki
    },
    success: {
      main: '#8FBC8F', // Dark sea green
      light: '#98FB98', // Pale green
      dark: '#556B2F', // Dark olive green
    },
  },
  typography: {
    fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
    h1: {
      fontFamily: "'Cinzel', serif",
      fontSize: '3.5rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      background: 'linear-gradient(135deg, #D4AF37 0%, #B87333 50%, #B5A642 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    h2: {
      fontFamily: "'Cinzel', serif",
      fontSize: '2.75rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
      color: '#D4AF37',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    h3: {
      fontFamily: "'Cinzel', serif",
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#F5E6D3',
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    },
    h4: {
      fontFamily: "'Cinzel', serif",
      fontSize: '1.875rem',
      fontWeight: 500,
      lineHeight: 1.3,
      color: '#F5E6D3',
    },
    h5: {
      fontFamily: "'Cinzel', serif",
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#D4C5A9',
    },
    h6: {
      fontFamily: "'Cinzel', serif",
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#D4C5A9',
    },
    subtitle1: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#D4C5A9',
      fontStyle: 'italic',
    },
    subtitle2: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#D4C5A9',
      fontStyle: 'italic',
    },
    body1: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: '1.125rem',
      lineHeight: 1.8,
      color: '#D4C5A9',
    },
    body2: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#D4C5A9',
    },
    button: {
      fontFamily: "'Cinzel', serif",
      fontSize: '0.9rem',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    caption: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#8D7B6A',
    },
    overline: {
      fontFamily: "'Cinzel', serif",
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      fontWeight: 500,
      color: '#D4AF37',
    },
  },
  shape: {
    borderRadius: 8,
    borderRadiusLarge: 16,
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0, 0, 0, 0.3)',
    '0 4px 16px rgba(0, 0, 0, 0.4)',
    '0 8px 32px rgba(0, 0, 0, 0.5)',
    '0 12px 48px rgba(0, 0, 0, 0.6)',
    '0 16px 64px rgba(0, 0, 0, 0.7)',
    // ... extending shadows array for luxury feel
    ...Array(19).fill('0 20px 80px rgba(0, 0, 0, 0.8)'),
  ],
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 400, // Slower for luxury feel
      complex: 600,
      enteringScreen: 400,
      leavingScreen: 300,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      easeIn: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#D4AF37 #0F0A06',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 12,
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            background: '#0F0A06',
            borderRadius: 6,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(180deg, #D4AF37 0%, #8B4513 100%)',
            borderRadius: 6,
            border: '2px solid #0F0A06',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            background: 'linear-gradient(180deg, #B5A642 0%, #A0522D 100%)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          borderRadius: 8,
          padding: '12px 32px',
          fontSize: '0.9rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          fontFamily: "'Cinzel', serif",
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'left 0.6s',
          },
          '&:hover::before': {
            left: '100%',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #D4AF37 0%, #B87333 100%)',
          color: '#0F0A06',
          boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #B5A642 0%, #A0522D 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 32px rgba(212, 175, 55, 0.4)',
          },
        },
        outlined: {
          border: '2px solid #D4AF37',
          color: '#D4AF37',
          '&:hover': {
            background: '#D4AF37',
            color: '#0F0A06',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)',
          },
        },
        text: {
          color: '#D4AF37',
          '&:hover': {
            background: 'rgba(212, 175, 55, 0.1)',
            color: '#B5A642',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          background: `
            radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
            linear-gradient(45deg, rgba(60, 36, 20, 0.8) 0%, rgba(26, 18, 8, 0.9) 100%)
          `,
          backgroundColor: '#1A1208',
          border: '2px solid rgba(212, 175, 55, 0.2)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: 'linear-gradient(90deg, #D4AF37 0%, #B87333 50%, #B5A642 100%)',
            opacity: 0.8,
          },
          '&:hover': {
            transform: 'translateY(-8px) rotateX(2deg)',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)',
            borderColor: 'rgba(212, 175, 55, 0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: '#1A1208',
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        },
        elevation2: {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
        },
        elevation3: {
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#2D1B0E',
            border: '2px solid rgba(212, 175, 55, 0.3)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            '& fieldset': {
              borderColor: 'rgba(212, 175, 55, 0.3)',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: 'rgba(212, 175, 55, 0.5)',
              boxShadow: '0 0 16px rgba(212, 175, 55, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#D4AF37',
              borderWidth: 3,
              boxShadow: '0 0 24px rgba(212, 175, 55, 0.3)',
            },
            '& input': {
              color: '#F5E6D3',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.1rem',
              '&::placeholder': {
                color: '#8D7B6A',
                opacity: 1,
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: '#D4C5A9',
            fontFamily: "'Cinzel', serif",
            fontSize: '0.9rem',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#D4AF37',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: `
            linear-gradient(180deg, 
              rgba(15, 10, 6, 0.95) 0%, 
              rgba(26, 18, 8, 0.9) 50%,
              rgba(45, 27, 14, 0.85) 100%
            )
          `,
          backdropFilter: 'blur(20px)',
          borderBottom: '2px solid rgba(212, 175, 55, 0.2)',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.8)',
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)',
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: '0 32px',
          minHeight: '80px !important',
          position: 'relative',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: `
            linear-gradient(45deg, 
              rgba(15, 10, 6, 0.98) 0%, 
              rgba(26, 18, 8, 0.95) 50%,
              rgba(45, 27, 14, 0.92) 100%
            )
          `,
          backdropFilter: 'blur(20px)',
          borderRight: '2px solid rgba(212, 175, 55, 0.2)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: 1,
            height: '100%',
            background: 'linear-gradient(180deg, transparent 0%, #D4AF37 50%, transparent 100%)',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '4px 16px',
          padding: '12px 20px',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            background: 'linear-gradient(180deg, #D4AF37 0%, #B87333 100%)',
            transform: 'scaleY(0)',
            transformOrigin: 'center',
            transition: 'transform 0.3s ease',
          },
          '&:hover': {
            background: 'rgba(212, 175, 55, 0.1)',
            transform: 'translateX(8px)',
            '&::before': {
              transform: 'scaleY(1)',
            },
          },
          '&.Mui-selected': {
            background: 'rgba(212, 175, 55, 0.15)',
            '&::before': {
              transform: 'scaleY(1)',
            },
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: "'Cinzel', serif",
          fontSize: '0.95rem',
          fontWeight: 500,
          color: '#F5E6D3',
          letterSpacing: '0.05em',
        },
        secondary: {
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '0.85rem',
          color: '#D4C5A9',
          fontStyle: 'italic',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: `
            radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(139, 69, 19, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, rgba(45, 27, 14, 0.95) 0%, rgba(26, 18, 8, 0.98) 100%)
          `,
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(212, 175, 55, 0.3)',
          borderRadius: 20,
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.8)',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          background: 'rgba(45, 27, 14, 0.5)',
          borderRadius: 12,
          padding: '4px',
          '& .MuiTabs-indicator': {
            background: 'linear-gradient(90deg, #D4AF37 0%, #B87333 100%)',
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "'Cinzel', serif",
          fontSize: '0.9rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#D4C5A9',
          borderRadius: 8,
          margin: '0 4px',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(212, 175, 55, 0.1)',
            color: '#D4AF37',
          },
          '&.Mui-selected': {
            color: '#D4AF37',
            background: 'rgba(212, 175, 55, 0.15)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(139, 69, 19, 0.2) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          color: '#F5E6D3',
          fontFamily: "'Cinzel', serif",
          fontSize: '0.8rem',
          fontWeight: 500,
          letterSpacing: '0.05em',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(139, 69, 19, 0.3) 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 16px rgba(212, 175, 55, 0.2)',
          },
        },
        deleteIcon: {
          color: '#D4AF37',
          '&:hover': {
            color: '#B5A642',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: 'rgba(26, 18, 8, 0.8)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          borderRadius: '12px !important',
          margin: '8px 0',
          '&::before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '16px 0',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.1) 0%, transparent 100%)',
          borderRadius: '12px 12px 0 0',
          padding: '0 24px',
          '&.Mui-expanded': {
            minHeight: 56,
          },
        },
        content: {
          fontFamily: "'Cinzel', serif",
          fontSize: '1.1rem',
          fontWeight: 500,
          color: '#F5E6D3',
          letterSpacing: '0.05em',
        },
        expandIconWrapper: {
          color: '#D4AF37',
          transition: 'transform 0.3s ease, color 0.3s ease',
          '&.Mui-expanded': {
            transform: 'rotate(180deg)',
            color: '#B5A642',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '20px 24px',
          background: 'rgba(15, 10, 6, 0.3)',
          borderTop: '1px solid rgba(212, 175, 55, 0.1)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'linear-gradient(135deg, rgba(45, 27, 14, 0.95) 0%, rgba(26, 18, 8, 0.98) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: 8,
          fontSize: '0.85rem',
          fontFamily: "'Cormorant Garamond', serif",
          color: '#F5E6D3',
          padding: '8px 12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        },
        arrow: {
          color: 'rgba(45, 27, 14, 0.95)',
          '&::before': {
            border: '1px solid rgba(212, 175, 55, 0.3)',
          },
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            background: 'linear-gradient(135deg, rgba(45, 27, 14, 0.95) 0%, rgba(26, 18, 8, 0.98) 100%)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: 12,
            color: '#F5E6D3',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#D4AF37',
          height: 6,
        },
        track: {
          background: 'linear-gradient(90deg, #D4AF37 0%, #B87333 100%)',
          border: 'none',
          height: 6,
        },
        rail: {
          background: 'rgba(212, 175, 55, 0.2)',
          height: 6,
        },
        thumb: {
          background: 'linear-gradient(135deg, #D4AF37 0%, #B87333 100%)',
          border: '2px solid #0F0A06',
          width: 20,
          height: 20,
          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.4)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(212, 175, 55, 0.5)',
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 58,
          height: 32,
          padding: 0,
          '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '400ms',
            '&.Mui-checked': {
              transform: 'translateX(26px)',
              color: '#0F0A06',
              '& + .MuiSwitch-track': {
                background: 'linear-gradient(90deg, #D4AF37 0%, #B87333 100%)',
                opacity: 1,
                border: 0,
              },
            },
          },
          '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 28,
            height: 28,
            background: 'linear-gradient(135deg, #F5E6D3 0%, #E6D7C3 100%)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          },
          '& .MuiSwitch-track': {
            borderRadius: 16,
            background: 'rgba(212, 175, 55, 0.3)',
            opacity: 1,
            transition: 'background-color 400ms',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 8,
          borderRadius: 4,
          background: 'rgba(212, 175, 55, 0.2)',
        },
        bar: {
          borderRadius: 4,
          background: 'linear-gradient(90deg, #D4AF37 0%, #B87333 50%, #B5A642 100%)',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          '& .MuiCircularProgress-circle': {
            stroke: 'url(#goldGradient)',
          },
        },
      },
    },
  },
  // Custom CSS animations and keyframes
  '@keyframes bookPageTurn': {
    '0%': {
      transform: 'rotateY(0deg) scale(1)',
      opacity: 1,
    },
    '50%': {
      transform: 'rotateY(-90deg) scale(0.8)',
      opacity: 0.7,
    },
    '100%': {
      transform: 'rotateY(-180deg) scale(1)',
      opacity: 1,
    },
  },
  '@keyframes luxuryGlow': {
    '0%, 100%': {
      boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
    },
    '50%': {
      boxShadow: '0 0 40px rgba(212, 175, 55, 0.5), 0 0 60px rgba(139, 69, 19, 0.3)',
    },
  },
  '@keyframes goldShimmer': {
    '0%': {
      backgroundPosition: '-200px 0',
    },
    '100%': {
      backgroundPosition: '200px 0',
    },
  },
  '@keyframes leatherTexture': {
    '0%, 100%': {
      backgroundSize: '100% 100%',
    },
    '50%': {
      backgroundSize: '110% 110%',
    },
  },
});

// Add custom gradient definitions for SVG elements
const customStyles = `
  <defs>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#D4AF37;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#B87333;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#B5A642;stop-opacity:1" />
    </linearGradient>
  </defs>
`;

export default theme;