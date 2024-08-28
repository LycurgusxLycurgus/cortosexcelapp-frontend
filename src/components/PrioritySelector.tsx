import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/system';

interface PrioritySelectorProps {
  priority: number;
  onChange: (newPriority: number) => void;
}

const ArcadeSelect = styled(Select)(({ theme }) => ({
  fontFamily: '"Press Start 2P", cursive',
  backgroundColor: '#000',
  color: '#00ff00',
  border: '2px solid #00ff00',
  borderRadius: '4px',
  '& .MuiSelect-icon': {
    color: '#00ff00',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSelect-select': {
    padding: '10px',
  },
}));

const ArcadeMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: '"Press Start 2P", cursive',
  backgroundColor: '#000',
  color: '#00ff00',
  '&:hover': {
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    '&:hover': {
      backgroundColor: 'rgba(0, 255, 0, 0.3)',
    },
  },
}));

const PrioritySelector: React.FC<PrioritySelectorProps> = ({ priority, onChange }) => {
  const handleChange = (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
    const newValue = event.target.value as number;
    onChange(newValue);
  };

  return (
    <ArcadeSelect value={priority} onChange={handleChange} size="small">
      <ArcadeMenuItem value={1}>Urgent</ArcadeMenuItem>
      <ArcadeMenuItem value={2}>Meh</ArcadeMenuItem>
    </ArcadeSelect>
  );
};

export default PrioritySelector;