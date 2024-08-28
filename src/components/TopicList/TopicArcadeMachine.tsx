import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ArcadeButton, ArcadeScreen, PixelText, ArcadeTextArea } from '../ArcadeComponents';
import { Topic } from './types';
import CommentSection from '../CommentSection';

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

  const handleSave = () => {
    onEdit(topic.id, editedContent, topic.priority);
    setEditMode(false);
  };

  return (
    <ArcadeScreen sx={{ p: 2, maxWidth: 600, margin: 'auto' }}>
      <PixelText variant="h5" component="h2" gutterBottom>
        Topic Arcade Machine
      </PixelText>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ backgroundColor: '#001100', p: 2, borderRadius: '4px' }}>
          {editMode ? (
            <ArcadeTextArea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <PixelText variant="body1">{topic.content}</PixelText>
          )}
        </Box>
        <Box>
          <Typography variant="caption" display="block" gutterBottom>
            Created by: {topic.createdBy}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Created at: {new Date(topic.createdAt).toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
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