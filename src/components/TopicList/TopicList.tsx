import React, { useState } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelatedBox, ArcadeScreen } from '../ArcadeComponents';
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
        <ArcadeScreen onClick={() => setIsCreatingTopic(true)} sx={{ cursor: 'pointer', p: 2, textAlign: 'center' }}>
          <Typography variant="h6">Create New Topic</Typography>
        </ArcadeScreen>
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
      <CreateTopic
        open={isCreatingTopic}
        onClose={() => setIsCreatingTopic(false)}
        onCreateTopic={handleCreateTopic}
      />
    </PixelatedBox>
  );
};

const TopicGrid: React.FC<{ topics: Topic[], setSelectedTopic: (topic: Topic) => void }> = ({ topics, setSelectedTopic }) => (
  <Grid container spacing={2}>
    {topics.map((topic) => (
      <Grid item xs={12} sm={6} key={topic.id}>
        <ArcadeScreen
          onClick={() => setSelectedTopic(topic)}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            {topic.content.length > 50 ? `${topic.content.substring(0, 50)}...` : topic.content}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Typography variant="caption">
              {topic.user?.username || 'Unknown user'}
            </Typography>
            <Typography variant="caption">
              {new Date(topic.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </ArcadeScreen>
      </Grid>
    ))}
  </Grid>
);

export default TopicList;