import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import PrioritySelector from './PrioritySelector';

interface EditTopicProps {
  topic: { id: number; content: string; priority: number };
  open: boolean;
  onClose: () => void;
  onSave: (id: number, content: string, priority: number) => void;
}

const EditTopic: React.FC<EditTopicProps> = ({ topic, open, onClose, onSave }) => {
  const [content, setContent] = useState(topic.content);
  const [priority, setPriority] = useState(topic.priority);

  const handleSave = () => {
    onSave(topic.id, content, priority);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Topic</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Content"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <PrioritySelector priority={priority} onChange={setPriority} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTopic;