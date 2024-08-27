import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface ExperienceBarProps {
  experience: number;
}

const StyledLinearProgress = styled(LinearProgress)<{ $experience: number }>(({ theme, $experience }) => ({
  height: 10,
  borderRadius: 5,
  width: '80%',
  margin: '0 auto',
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    animation: $experience >= 20 ? 'glow 1s ease-in-out infinite alternate' : 'none',
  },
  '@keyframes glow': {
    '0%': {
      boxShadow: '0 0 5px #00ff00',
    },
    '100%': {
      boxShadow: '0 0 20px #00ff00',
    },
  },
}));

const ExperienceBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 10,
  textAlign: 'center',
}));

const ExperienceBar: React.FC<ExperienceBarProps> = ({ experience }) => {
  return (
    <ExperienceBox>
      <Typography variant="h6" gutterBottom color="primary">
        Your Experience
      </Typography>
      <StyledLinearProgress 
        $experience={experience}
        variant="determinate" 
        value={(experience / 20) * 100} 
        color="secondary" 
        sx={{ marginTop: '0.5cm' }}
      />
    </ExperienceBox>
  );
};

export default ExperienceBar;