import React, { useState, useEffect, useCallback } from 'react';
import { List, ListItem, ListItemText, Typography, Container, Button, Checkbox, IconButton, CircularProgress, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getTopics, updateTopic, toggleDiscussed, archiveTopic, addComment } from '../api/api';
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { motion, AnimatePresence } from 'framer-motion';
import { ArcadeButton, PixelatedBox } from './ArcadeComponents';
import PrioritySelector from './PrioritySelector';
import EditTopic from './EditTopic';
import CommentSection from './CommentSection';
import { AxiosError } from 'axios';

interface Topic {
  id: number;
  content: string;
  createdAt: string;
  priority: number;
  discussed: boolean;
  archived: boolean;
  user: {
    username: string;
  };
  comments: Comment[];
}

interface Comment {
  id: number;
  content: string;
  user: { username: string };
  createdAt: string;
}

interface TopicListProps {
  focusMode: boolean;
  onAction: () => void;
}

const TopicList: React.FC<TopicListProps> = ({ focusMode, onAction }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(() => {
    const stored = localStorage.getItem('expandedTopics');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const navigate = useNavigate();

  const fetchTopics = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        setLoading(true);
        const fetchedTopics = await getTopics(token);
        setTopics(fetchedTopics);
      } catch (error) {
        console.error('Failed to fetch topics:', error);
      } finally {
        setLoading(false);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  useEffect(() => {
    localStorage.setItem('expandedTopics', JSON.stringify(Array.from(expandedTopics)));
  }, [expandedTopics]);

  const handleExpandTopic = (topicId: number) => {
    setExpandedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const handleAddComment = async (topicId: number, content: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const addedComment = await addComment(topicId, content, token);
        setTopics(prevTopics =>
          prevTopics.map(topic =>
            topic.id === topicId
              ? { ...topic, comments: [...topic.comments, addedComment] }
              : topic
          )
        );
        onAction(); // Call onAction when a comment is added
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  };

  const handleEditTopic = async (id: number, content: string, priority: number) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await updateTopic(id, content, priority, token);
        fetchTopics();
      } catch (error) {
        if (error instanceof Error) {
          console.error('Failed to update topic:', error.message);
        } else {
          console.error('Failed to update topic:', String(error));
        }
      }
    }
  };

  const handleToggleDiscussed = async (id: number) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await toggleDiscussed(id, token);
        fetchTopics();
      } catch (error) {
        console.error('Failed to toggle discussed:', error);
      }
    }
  };

  const handleArchiveTopic = async (id: number) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await archiveTopic(id, token);
        fetchTopics();
      } catch (error) {
        console.error('Failed to archive topic:', error);
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <PixelatedBox>
      <Typography variant="h4" component="h1" gutterBottom>
        Topics
      </Typography>
      {!focusMode && (
        <ArcadeButton variant="contained" color="primary" onClick={() => { navigate('/create-topic'); onAction(); }}>
          Create New Topic
        </ArcadeButton>
      )}
      {topics.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>No topics available. Create a new one!</Typography>
      ) : (
        <List>
          <AnimatePresence>
            {topics.map((topic) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ListItem>
                  <ListItemText
                    primary={topic.content}
                    secondary={`Created by ${topic.user.username} on ${format(new Date(topic.createdAt), 'PPP')}`}
                  />
                  {!focusMode && (
                    <>
                      <PrioritySelector priority={topic.priority} onChange={(newPriority) => handleEditTopic(topic.id, topic.content, newPriority)} />
                      <Checkbox
                        checked={topic.discussed}
                        onChange={() => handleToggleDiscussed(topic.id)}
                        color="primary"
                      />
                      <IconButton onClick={() => setEditingTopic(topic)}>
                        <EditIcon />
                      </IconButton>
                      {!topic.archived && (
                        <IconButton onClick={() => handleArchiveTopic(topic.id)}>
                          <ArchiveIcon />
                        </IconButton>
                      )}
                    </>
                  )}
                  <IconButton onClick={() => handleExpandTopic(topic.id)}>
                    {expandedTopics.has(topic.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </ListItem>
                <AnimatePresence>
                  {expandedTopics.has(topic.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <CommentSection
                        topicId={topic.id}
                        comments={topic.comments}
                        onAddComment={handleAddComment}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
      )}
      {editingTopic && (
        <EditTopic
          topic={editingTopic}
          open={!!editingTopic}
          onClose={() => setEditingTopic(null)}
          onSave={handleEditTopic}
        />
      )}
    </PixelatedBox>
  );
};

export default TopicList;