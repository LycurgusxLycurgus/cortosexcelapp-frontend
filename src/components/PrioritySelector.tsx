import React from 'react';
import { Box, Typography } from '@mui/material';
import { ArcadeButton } from './ArcadeComponents';

interface PrioritySelectorProps {
  priority: number;
  onChange: (newPriority: number) => void;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({ priority, onChange }) => {
  const togglePriority = () => {
    onChange(priority === 1 ? 2 : 1);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="body2" sx={{ fontFamily: '"Press Start 2P", cursive', color: '#00ff00' }}>
        Priority:
      </Typography>
      <ArcadeButton onClick={togglePriority} sx={{ minWidth: '120px' }}>
        {priority === 1 ? 'Urgent' : 'Meh'}
      </ArcadeButton>
    </Box>
  );
};

export default PrioritySelector;