import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getTopics } from '../api/api';
import { format } from 'date-fns';

interface Topic {
  id: number;
  content: string;
  createdAt: string;
  user: {
    username: string;
  };
}

const TopicList: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
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
    };

    fetchTopics();
  }, [navigate]);

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
              secondary={`By ${topic.user.username.split('@')[0]} on ${format(new Date(topic.createdAt), 'PPpp')}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TopicList;