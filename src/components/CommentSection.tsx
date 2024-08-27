import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArcadeButton, PixelatedBox } from './ArcadeComponents';

interface Comment {
  id: number;
  content: string;
  user: { username: string };
  createdAt: string;
}

interface CommentSectionProps {
  topicId: number;
  comments: Comment[];
  onAddComment: (topicId: number, content: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ topicId, comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(topicId, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <PixelatedBox>
      <Typography variant="h6">Comments</Typography>
      <List>
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ListItem>
                <ListItemText
                  primary={comment.content}
                  secondary={`${comment.user.username} - ${new Date(comment.createdAt).toLocaleString()}`}
                />
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          margin="normal"
        />
        <ArcadeButton type="submit" variant="contained" color="primary">
          Add Comment
        </ArcadeButton>
      </form>
    </PixelatedBox>
  );
};

export default CommentSection;