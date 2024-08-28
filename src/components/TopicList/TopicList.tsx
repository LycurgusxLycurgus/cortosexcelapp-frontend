import React, { useState } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelatedBox, ArcadeScreen, glowAnimation } from '../ArcadeComponents';
import useTopicList from './useTopicList';
import { Topic } from './types';
import TopicArcadeMachine from './TopicArcadeMachine';
import CreateTopic from '../CreateTopic';

interface TopicListProps {
  focusMode: boolean;
  onAction: () => void;
}

export const TopicList: React.FC<TopicListProps> = ({ focusMode, onAction }) => {
  const { topics, loading, handleEditTopic, handleToggleDiscussed, handleArchiveTopic, handleAddComment, handleCreateTopic } = useTopicList(onAction);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);

  if (loading) {
    return (
      <PixelatedBox>
        <Typography variant="h4">Loading Arcade...</Typography>
      </PixelatedBox>
    );
  }

  const urgentTopics = topics.filter(topic => topic.priority === 1);
  const otherTopics = topics.filter(topic => topic.priority !== 1);

  return (
    <PixelatedBox>
      <Typography variant="h4" component="h1" gutterBottom>
        Topic Arcade
      </Typography>
      <Box sx={{ mb: 2 }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: ['0 0 0 0 rgba(0, 255, 0, 0)', '0 0 0 20px rgba(0, 255, 0, 0)'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <ArcadeScreen
            onClick={() => setIsCreatingTopic(true)}
            sx={{
              cursor: 'pointer',
              p: 2,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
              },
            }}
          >
            <Typography variant="h6">Create New Topic</Typography>
          </ArcadeScreen>
        </motion.div>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>Urgent</Typography>
          <TopicGrid topics={urgentTopics} setSelectedTopic={setSelectedTopic} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>Other Topics</Typography>
          <TopicGrid topics={otherTopics} setSelectedTopic={setSelectedTopic} />
        </Grid>
      </Grid>
      <AnimatePresence>
        {selectedTopic && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '600px',
              zIndex: 1000,
            }}
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
      <AnimatePresence>
        {isCreatingTopic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 1000,
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <CreateTopic
                open={isCreatingTopic}
                onClose={() => setIsCreatingTopic(false)}
                onCreateTopic={handleCreateTopic}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PixelatedBox>
  );
};

const TopicGrid: React.FC<{ topics: Topic[], setSelectedTopic: (topic: Topic) => void }> = ({ topics, setSelectedTopic }) => (
  <Grid container spacing={2}>
    {topics.map((topic) => (
      <Grid item xs={12} sm={6} key={topic.id}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <ArcadeScreen
            onClick={() => setSelectedTopic(topic)}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                animation: `${glowAnimation} 1.5s infinite`,
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '0',
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(120deg, transparent, rgba(0, 255, 0, 0.4), transparent)',
                transition: 'all 0.5s',
              },
              '&:hover::before': {
                left: '100%',
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              {topic.content.length > 50 ? `${topic.content.substring(0, 50)}...` : topic.content}
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Typography variant="caption">
                {topic.user?.username || 'Unknown user'}
              </Typography>
            </Box>
          </ArcadeScreen>
        </motion.div>
      </Grid>
    ))}
  </Grid>
);

export default TopicList;