import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00ff00', // Neon green
    },
    secondary: {
      main: '#ff00ff', // Neon pink
    },
    background: {
      default: '#000000', // Dark background
      paper: '#111111',
    },
    text: {
      primary: '#ffffff',
      secondary: '#00ffff', // Neon cyan
    },
  },
  typography: {
    fontFamily: '"Press Start 2P", cursive',
    h1: {
      fontSize: '2rem',
      letterSpacing: '0.1em',
    },
    body1: {
      fontSize: '0.875rem',
      letterSpacing: '0.05em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          padding: '12px 24px',
          '&:hover': {
            animation: 'pulse 0.5s infinite',
          },
        },
      },
    },
  },
});

export default theme;