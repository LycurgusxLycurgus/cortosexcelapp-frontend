import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff00', // Neon green
    },
    secondary: {
      main: '#ff00ff', // Neon pink
    },
    background: {
      default: '#000000', // Black
      paper: '#111111', // Dark gray
    },
    text: {
      primary: '#00ff00', // Neon green
      secondary: '#ff00ff', // Neon pink
    },
  },
  typography: {
    fontFamily: '"Press Start 2P", cursive',
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.25rem',
    },
    h6: {
      fontSize: '1rem',
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: #000000;
          background-image: radial-gradient(#00ff00 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `,
    },
  },
});

export default theme;