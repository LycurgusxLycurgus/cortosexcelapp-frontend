import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArcadeButton, ArcadeScreen, PixelText, ArcadeTextArea } from './ArcadeComponents';
import PrioritySelector from './PrioritySelector';

interface CreateTopicProps {
  open: boolean;
  onClose: () => void;
  onCreateTopic: (content: string, priority: number) => void;
}

const CreateTopic: React.FC<CreateTopicProps> = ({ open, onClose, onCreateTopic }) => {
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState(2); // Default to 'meh' priority

  const handleSubmit = () => {
    onCreateTopic(content, priority);
    setContent('');
    setPriority(2);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
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
          <ArcadeScreen sx={{ p: 2, maxWidth: 600, margin: 'auto' }}>
            <PixelText variant="h5" component="h2" gutterBottom>
              Create New Topic
            </PixelText>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ backgroundColor: '#001100', p: 2, borderRadius: '4px' }}>
                <ArcadeTextArea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter topic content"
                />
              </Box>
              <Box>
                <Typography variant="caption" display="block" gutterBottom>
                  Set Priority:
                </Typography>
                <PrioritySelector priority={priority} onChange={setPriority} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                <ArcadeButton onClick={onClose}>Cancel</ArcadeButton>
                <ArcadeButton onClick={handleSubmit}>Create</ArcadeButton>
              </Box>
            </Box>
          </ArcadeScreen>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateTopic;