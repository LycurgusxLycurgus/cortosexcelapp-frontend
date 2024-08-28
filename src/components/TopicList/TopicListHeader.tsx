import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArcadeButton } from '../ArcadeComponents';

interface TopicListHeaderProps {
  focusMode: boolean;
  onAction: () => void;
}

const TopicListHeader: React.FC<TopicListHeaderProps> = ({ focusMode, onAction }) => {
  const navigate = useNavigate();

  if (focusMode) return null;

  return (
    <ArcadeButton variant="contained" color="primary" onClick={() => { navigate('/create-topic'); onAction(); }}>
      Create New Topic
    </ArcadeButton>
  );
};

export default TopicListHeader;