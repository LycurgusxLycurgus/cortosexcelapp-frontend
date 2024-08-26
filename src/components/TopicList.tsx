import React, { useState, useEffect, useCallback } from 'react';
import { List, ListItem, ListItemText, Typography, Container, Button, Checkbox, IconButton, CircularProgress, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getTopics, updateTopic, toggleDiscussed, archiveTopic, addComment } from '../api/api';
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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
}

const TopicList: React.FC = () => {
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
              ? { ...topic, comments: [...(topic.comments || []), addedComment] }
              : topic
          )
        );
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
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Topics
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/create-topic')}>
        Create New Topic
      </Button>
      {topics.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>No topics available. Create a new one!</Typography>
      ) : (
        <List>
          {topics.map((topic) => (
            <React.Fragment key={topic.id}>
              <ListItem>
                <ListItemText
                  primary={topic.content}
                  secondary={`By ${topic.user.username} on ${format(new Date(topic.createdAt), 'PPpp')}`}
                />
                <PrioritySelector
                  priority={topic.priority}
                  onChange={(newPriority) => handleEditTopic(topic.id, topic.content, newPriority)}
                />
                <Checkbox
                  checked={topic.discussed}
                  onChange={() => handleToggleDiscussed(topic.id)}
                  inputProps={{ 'aria-label': 'Toggle discussed' }}
                />
                <IconButton onClick={() => setEditingTopic(topic)}>
                  <EditIcon />
                </IconButton>
                {topic.discussed && !topic.archived && (
                  <IconButton onClick={() => handleArchiveTopic(topic.id)}>
                    <ArchiveIcon />
                  </IconButton>
                )}
                <IconButton onClick={() => handleExpandTopic(topic.id)}>
                  {expandedTopics.has(topic.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </ListItem>
              <Collapse in={expandedTopics.has(topic.id)}>
                <CommentSection
                  topicId={topic.id}
                  comments={topic.comments || []}
                  onAddComment={handleAddComment}
                />
              </Collapse>
            </React.Fragment>
          ))}
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
    </Container>
  );
};

export default TopicList;