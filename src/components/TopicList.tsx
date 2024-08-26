import React, { useState, useEffect, useCallback } from 'react';
import { List, ListItem, ListItemText, Typography, Container, Button, Checkbox, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getTopics, updateTopic, toggleDiscussed, archiveTopic, addComment } from '../api/api';
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import PrioritySelector from './PrioritySelector';
import EditTopic from './EditTopic';
import CommentSection from './CommentSection';

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
  comments: Array<{
    id: number;
    content: string;
    user: { username: string };
  }>;
}

const TopicList: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const navigate = useNavigate();

  const fetchTopics = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const fetchedTopics = await getTopics(token);
        setTopics(fetchedTopics);
      } catch (error) {
        console.error('Failed to fetch topics:', error);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const handleEditTopic = async (id: number, content: string, priority: number) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await updateTopic(id, content, priority, token);
        fetchTopics();
      } catch (error) {
        console.error('Failed to update topic:', error);
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
        console.error('Failed to toggle discussed status:', error);
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

  const handleAddComment = async (topicId: number, content: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await addComment(topicId, content, token);
        fetchTopics();
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Topics
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/create-topic')}>
        Create New Topic
      </Button>
      <List>
        {topics.map((topic) => (
          <ListItem key={topic.id}>
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
            <CommentSection
              topicId={topic.id}
              comments={topic.comments}
              onAddComment={handleAddComment}
            />
          </ListItem>
        ))}
      </List>
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