import React, { useState } from 'react';
import { TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTopic } from '../api/api';
import PrioritySelector from './PrioritySelector';
import { motion } from 'framer-motion';
import { ArcadeButton, PixelatedBox } from './ArcadeComponents';

interface Props {
  onAction: () => void;
}

const CreateTopic: React.FC<Props> = ({ onAction }) => {
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState(2); // Default to "Meh"
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await createTopic(content, priority, token);
        onAction(); // Call onAction after successful topic creation
        navigate('/topics');
      } catch (error) {
        console.error('Failed to create topic:', error);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PixelatedBox>
          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
              Create New Topic
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                multiline
                rows={4}
                label="Topic Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <PrioritySelector priority={priority} onChange={setPriority} />
              <ArcadeButton type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Create Topic
              </ArcadeButton>
            </Box>
          </Box>
        </PixelatedBox>
      </motion.div>
    </Container>
  );
};

export default CreateTopic;