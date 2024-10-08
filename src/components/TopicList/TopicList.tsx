import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { PixelatedBox, ArcadeScreen } from '../ArcadeComponents';
import useTopicList from './useTopicList';
import { Topic } from './types';
import TopicArcadeMachine from './TopicArcadeMachine';
import CreateTopic from '../CreateTopic';
import { useModal } from '../../contexts/ModalContext';
import { keyframes } from '@mui/system';

// Define the scanline animation for the "Create New Topic" button
const scanlineAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 100%; }
`;

// Define the sweep animation for the topic cards
const sweepAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

interface TopicListProps {
  focusMode: boolean;
  onAction: () => void;
}

export const TopicList: React.FC<TopicListProps> = ({ focusMode, onAction }) => {
  const { topics, loading, handleEditTopic, handleToggleDiscussed, handleArchiveTopic, handleAddComment, handleCreateTopic } = useTopicList(onAction);
  const { openModal, closeModal } = useModal();

  if (loading) {
    return (
      <PixelatedBox>
        <Typography variant="h4">Loading Arcade...</Typography>
      </PixelatedBox>
    );
  }

  const urgentTopics = topics.filter(topic => topic.priority === 1);
  const mehTopics = topics.filter(topic => topic.priority === 2);

  const handleOpenCreateTopic = () => {
    openModal(
      <CreateTopic
        onClose={closeModal}
        onCreateTopic={(content, priority) => {
          handleCreateTopic(content, priority);
          closeModal();
        }}
      />
    );
  };

  const handleOpenTopicArcadeMachine = (topic: Topic) => {
    openModal(
      <TopicArcadeMachine
        topic={topic}
        onClose={closeModal}
        onEdit={handleEditTopic}
        onToggleDiscussed={handleToggleDiscussed}
        onArchive={handleArchiveTopic}
        onAddComment={handleAddComment}
        focusMode={focusMode}
      />
    );
  };

  const renderTopicGrid = (topicList: Topic[], title: string) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Grid container spacing={2}>
        {topicList.map((topic) => (
          <Grid item xs={12} sm={6} md={4} key={topic.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArcadeScreen
                onClick={() => handleOpenTopicArcadeMachine(topic)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: (theme) => theme.spacing(2),
                  '&:hover': {
                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                  },
                }}
              >
                <Typography variant="body1" gutterBottom>
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
    </Box>
  );

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
            onClick={handleOpenCreateTopic}
            sx={{
              cursor: 'pointer',
              p: 2,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 255, 0, 0.1) 50%)',
                backgroundSize: '100% 4px',
                animation: `${scanlineAnimation} 3s linear infinite`,
                pointerEvents: 'none',
              },
            }}
          >
            <Typography variant="h6">Create New Topic</Typography>
          </ArcadeScreen>
        </motion.div>
      </Box>
      {renderTopicGrid(urgentTopics, "Urgent Topics")}
      {renderTopicGrid(mehTopics, "Meh Topics")}
    </PixelatedBox>
  );
};

export default TopicList;