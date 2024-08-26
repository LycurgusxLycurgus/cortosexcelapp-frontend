import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface PrioritySelectorProps {
  priority: number;
  onChange: (newPriority: number) => void;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({ priority, onChange }) => {
  const handleChange = (event: SelectChangeEvent<number>) => {
    onChange(Number(event.target.value));
  };

  return (
    <Select value={priority} onChange={handleChange} size="small">
      <MenuItem value={1}>High</MenuItem>
      <MenuItem value={2}>Medium</MenuItem>
      <MenuItem value={3}>Low</MenuItem>
    </Select>
  );
};

export default PrioritySelector;