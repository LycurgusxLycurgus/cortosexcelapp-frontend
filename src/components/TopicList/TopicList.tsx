import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelatedBox, ArcadeButton } from '../ArcadeComponents';
import useTopicList from './useTopicList';
import { Topic } from './types';
import TopicArcadeMachine from './TopicArcadeMachine';

interface TopicListProps {
  focusMode: boolean;
  onAction: () => void;
}

export const TopicList: React.FC<TopicListProps> = ({ focusMode, onAction }) => {
  const { topics, loading, handleEditTopic, handleToggleDiscussed, handleArchiveTopic, handleAddComment } = useTopicList(onAction);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  if (loading) {
    return (
      <PixelatedBox>
        <Typography variant="h4">Loading Game...</Typography>
      </PixelatedBox>
    );
  }

  return (
    <PixelatedBox>
      <Typography variant="h4" component="h1" gutterBottom>
        Topic Arcade
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        <AnimatePresence>
          {topics.map((topic) => (
            <motion.div
              key={topic.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArcadeButton onClick={() => setSelectedTopic(topic)}>
                {topic.content.substring(0, 20)}...
              </ArcadeButton>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
      <AnimatePresence>
        {selectedTopic && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <TopicArcadeMachine
              topic={selectedTopic}
              onClose={() => setSelectedTopic(null)}
              onEdit={handleEditTopic}
              onToggleDiscussed={handleToggleDiscussed}
              onArchive={handleArchiveTopic}
              onAddComment={handleAddComment}
              focusMode={focusMode}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PixelatedBox>
  );
};