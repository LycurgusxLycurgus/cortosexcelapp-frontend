import React from 'react';
import { Box, Container, styled } from '@mui/material';
import { motion } from 'framer-motion';

const ArcadeScreen = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `4px solid ${theme.palette.primary.main}`,
  borderRadius: '16px',
  padding: theme.spacing(2),
  boxShadow: `0 0 20px ${theme.palette.primary.main}`,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    borderRadius: 0,
    border: 'none',
  },
}));

const ArcadeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container maxWidth="lg" disableGutters>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ArcadeScreen>
          {children}
        </ArcadeScreen>
      </motion.div>
    </Container>
  );
};

export default ArcadeLayout;