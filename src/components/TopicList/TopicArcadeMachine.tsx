import React, { useState } from 'react';
import { Box, Typography, useMediaQuery, Theme } from '@mui/material';
import { motion } from 'framer-motion';
import { ArcadeButton, ArcadeScreen, PixelText, ArcadeTextArea } from '../ArcadeComponents';
import { Topic } from './types';
import CommentSection from '../CommentSection';
import PrioritySelector from '../PrioritySelector';

interface TopicArcadeMachineProps {
  topic: Topic;
  onClose: () => void;
  onEdit: (id: number, content: string, priority: number) => void;
  onToggleDiscussed: (id: number) => void;
  onArchive: (id: number) => void;
  onAddComment: (topicId: number, content: string) => void;
  focusMode: boolean;
}

const TopicArcadeMachine: React.FC<TopicArcadeMachineProps> = ({
  topic,
  onClose,
  onEdit,
  onToggleDiscussed,
  onArchive,
  onAddComment,
  focusMode,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(topic.content);
  const [editedPriority, setEditedPriority] = useState(topic.priority);

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const handleSave = () => {
    onEdit(topic.id, editedContent, editedPriority);
    setEditMode(false);
  };

  return (
    <ArcadeScreen sx={{ 
      p: isMobile ? 1 : 2, 
      maxWidth: isMobile ? '100%' : 600, 
      margin: 'auto',
      maxHeight: isMobile ? '100vh' : 'auto',
      overflowY: 'auto',
    }}>
      <PixelText variant="h5" component="h2" gutterBottom>
        Topic Arcade Machine
      </PixelText>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 1 : 2 }}>
        <Box sx={{ backgroundColor: '#001100', p: isMobile ? 1 : 2, borderRadius: '4px' }}>
          {editMode ? (
            <ArcadeTextArea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <PixelText variant="body1" sx={{ wordBreak: 'break-word' }}>{topic.content}</PixelText>
          )}
        </Box>
        {editMode && (
          <PrioritySelector
            priority={editedPriority}
            onChange={(newPriority) => setEditedPriority(newPriority)}
          />
        )}
        <Box>
          <Typography variant="caption" display="block" gutterBottom>
            Created by: {topic.user?.username || 'Unknown user'}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Created at: {new Date(topic.createdAt).toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: 1 
        }}>
          <ArcadeButton onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancel' : 'Edit'}
          </ArcadeButton>
          {editMode && (
            <ArcadeButton onClick={handleSave}>Save</ArcadeButton>
          )}
          <ArcadeButton onClick={() => onToggleDiscussed(topic.id)}>
            {topic.discussed ? 'Undiscuss' : 'Discuss'}
          </ArcadeButton>
          <ArcadeButton onClick={() => onArchive(topic.id)}>Archive</ArcadeButton>
          <ArcadeButton onClick={onClose}>Close</ArcadeButton>
        </Box>
        {!focusMode && (
          <CommentSection
            topicId={topic.id}
            comments={topic.comments}
            onAddComment={onAddComment}
          />
        )}
      </Box>
    </ArcadeScreen>
  );
};

export default TopicArcadeMachine;