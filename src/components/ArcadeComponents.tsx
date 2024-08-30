import { Button, ButtonProps, Box, Typography, TypographyProps, styled } from '@mui/material';
import { keyframes } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';

export const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px #00ff00; }
  50% { box-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00; }
  100% { box-shadow: 0 0 5px #00ff00; }
`;

const pressAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const scanlineAnimation = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

interface ArcadeButtonProps extends ButtonProps {
  to?: string;
}

export const ArcadeButton = styled(
  ({ to, ...props }: ArcadeButtonProps) =>
    to ? <Button component={RouterLink} to={to} {...props} /> : <Button {...props} />
)(({ theme }) => ({
  fontFamily: '"Press Start 2P", cursive',
  backgroundColor: '#000',
  color: '#00ff00',
  border: '2px solid #00ff00',
  borderRadius: '4px',
  padding: '10px 20px',
  fontSize: '16px',
  textTransform: 'uppercase',
  transition: 'all 0.3s',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(120deg, transparent, rgba(0, 255, 0, 0.4), transparent)',
    transition: 'all 0.5s',
  },
  '&:hover': {
    animation: `${glowAnimation} 1.5s infinite`,
    '&:before': {
      left: '100%',
    },
  },
  '&:active': {
    animation: `${pressAnimation} 0.2s`,
  },
}));

export const PixelatedBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#000',
  border: '4px solid #00ff00',
  borderRadius: '10px',
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
  boxShadow: '0 0 10px #00ff00',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    borderRadius: '5px',
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
  },
}));

export const ArcadeScreen = styled(Box)(({ theme }) => ({
  backgroundColor: '#000',
  border: '4px solid #00ff00',
  borderRadius: '10px',
  padding: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(transparent 50%, rgba(0, 255, 0, 0.1) 50%)',
    backgroundSize: '100% 4px',
    animation: `${scanlineAnimation} 3s linear`,
    animationFillMode: 'forwards',
    pointerEvents: 'none',
  },
}));

export const PixelText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontFamily: '"Press Start 2P", cursive',
  color: '#00ff00',
  textShadow: '2px 2px #000',
  letterSpacing: '2px',
  lineHeight: '1.5',
}));

export const ArcadeInput = styled('input')(({ theme }) => ({
  fontFamily: '"Press Start 2P", cursive',
  backgroundColor: '#000',
  color: '#00ff00',
  border: '2px solid #00ff00',
  borderRadius: '4px',
  padding: '10px',
  fontSize: '16px',
  width: '100%',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 10px #00ff00',
  },
}));

export const ArcadeTextArea = styled('textarea')(({ theme }) => ({
  fontFamily: '"Press Start 2P", cursive',
  backgroundColor: '#000',
  color: '#00ff00',
  border: '2px solid #00ff00',
  borderRadius: '4px',
  padding: '10px',
  fontSize: '16px',
  width: '100%',
  resize: 'vertical',
  minHeight: '100px',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 10px #00ff00',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    padding: '8px',
  },
}));