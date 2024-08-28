import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/system';

interface ExperienceBarProps {
  experience: number;
  overflowClicks: number;
}

const pixelGrow = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

const ExperienceBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 10,
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  // Removed the border
}));

const PixelBar = styled(Box)<{ $progress: number }>(({ theme, $progress }) => ({
  width: '80%',
  height: '20px',
  margin: '0 auto',
  position: 'relative',
  backgroundColor: theme.palette.grey[300],
  borderRadius: '4px',
  overflow: 'hidden',
}));

const PixelFill = styled(Box)<{ $progress: number }>(({ theme, $progress }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: `${$progress}%`,
  backgroundColor: theme.palette.secondary.main,
  animation: `${pixelGrow} 0.5s ease-out`,
}));

const Pixel = styled(Box)(({ theme }) => ({
  width: '4px',
  height: '4px',
  position: 'absolute',
  backgroundColor: theme.palette.primary.main,
}));

const ExperienceBar: React.FC<ExperienceBarProps> = ({ experience, overflowClicks }) => {
  const [displayedExperience, setDisplayedExperience] = useState(0);

  useEffect(() => {
    setDisplayedExperience(Math.min(experience, 20));
  }, [experience]);

  const progress = (displayedExperience / 20) * 100;

  return (
    <ExperienceBox>
      <Typography variant="h6" gutterBottom color="primary">
        Your Experience
      </Typography>
      <PixelBar $progress={progress}>
        <PixelFill $progress={progress}>
          {[...Array(10)].map((_, i) => (
            <Pixel
              key={i}
              sx={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `${pixelGrow} 0.5s ease-out ${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </PixelFill>
      </PixelBar>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        {overflowClicks > 0 ? `Overflow power: ${overflowClicks}` : ''}
      </Typography>
    </ExperienceBox>
  );
};

export default ExperienceBar;