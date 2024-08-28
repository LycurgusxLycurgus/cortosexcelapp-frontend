import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ArcadeButton, ArcadeScreen, PixelText, ArcadeTextArea } from './ArcadeComponents';
import PrioritySelector from './PrioritySelector';

interface CreateTopicProps {
  onClose: () => void;
  onCreateTopic: (content: string, priority: number) => void;
}

const CreateTopic: React.FC<CreateTopicProps> = ({ onClose, onCreateTopic }) => {
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<number>(2); // Default to 'Meh' priority

  const handleSubmit = () => {
    onCreateTopic(content, priority);
    setContent('');
    setPriority(2);
    onClose();
  };

  return (
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
        <PrioritySelector
          priority={priority}
          onChange={(newPriority) => setPriority(newPriority)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <ArcadeButton onClick={onClose}>Cancel</ArcadeButton>
          <ArcadeButton onClick={handleSubmit}>Create</ArcadeButton>
        </Box>
      </Box>
    </ArcadeScreen>
  );
};

export default CreateTopic;