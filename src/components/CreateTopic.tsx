import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ArcadeButton, ArcadeTextArea, PixelText } from './ArcadeComponents';
import PrioritySelector from './PrioritySelector';

interface CreateTopicProps {
  open: boolean;
  onClose: () => void;
  onCreateTopic: (content: string, priority: number) => void;
}

const CreateTopic: React.FC<CreateTopicProps> = ({ open, onClose, onCreateTopic }) => {
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState(5);

  const handleSubmit = () => {
    onCreateTopic(content, priority);
    setContent('');
    setPriority(5);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <PixelText variant="h5">Create New Topic</PixelText>
      </DialogTitle>
      <DialogContent>
        <ArcadeTextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter topic content"
        />
        <PrioritySelector priority={priority} onChange={setPriority} />
      </DialogContent>
      <DialogActions>
        <ArcadeButton onClick={onClose}>Cancel</ArcadeButton>
        <ArcadeButton onClick={handleSubmit}>Create</ArcadeButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTopic;