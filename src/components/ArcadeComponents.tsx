import { Button, ButtonProps, styled } from '@mui/material';
import { Link, LinkProps } from 'react-router-dom';
import { motion } from 'framer-motion';

type ArcadeButtonProps = ButtonProps & {
  to?: string;
  component?: React.ElementType;
};

export const ArcadeButton = styled(Button)<ArcadeButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  border: `2px solid ${theme.palette.primary.main}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  },
}));

export const PixelatedBox = styled(motion.div)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `4px solid ${theme.palette.primary.main}`,
  borderImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAOklEQVQYV2NkIAAYiVbw//9/Y6DiM1ANJoyMjGdBbLgJQAX/kU0DKgDLkaQAvyW9+D+pThXoHAKyAM3QIwGXAAAAAElFTkSuQmCC") 1 repeat',
  borderImageSlice: '2',
  borderImageWidth: '2',
  borderImageOutset: '0',
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
}));