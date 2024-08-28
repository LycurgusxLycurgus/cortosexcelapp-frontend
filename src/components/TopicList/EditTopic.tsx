import React, { useState, forwardRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Paper, PaperProps } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArcadeButton } from '../ArcadeComponents';
import PrioritySelector from '../PrioritySelector';

interface EditTopicProps {
  topic: { id: number; content: string; priority: number };
  open: boolean;
  onClose: () => void;
  onSave: (id: number, content: string, priority: number) => void;
}

const MotionPaper = forwardRef<HTMLDivElement, PaperProps>((props, ref) => {
  return <Paper component={motion.div} ref={ref} {...props} />;
});

const EditTopic: React.FC<EditTopicProps> = ({ topic, open, onClose, onSave }) => {
  const [content, setContent] = useState(topic.content);
  const [priority, setPriority] = useState(topic.priority);

  const handleSave = () => {
    onSave(topic.id, content, priority);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          PaperComponent={MotionPaper}
          PaperProps={{
            initial: { opacity: 0, y: -50 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 50 },
            transition: { duration: 0.3 },
          }}
        >
          <DialogTitle>Edit Topic</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Topic Content"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <PrioritySelector priority={priority} onChange={setPriority} />
          </DialogContent>
          <DialogActions>
            <ArcadeButton onClick={onClose} color="primary">
              Cancel
            </ArcadeButton>
            <ArcadeButton onClick={handleSave} color="primary">
              Save
            </ArcadeButton>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default EditTopic;
