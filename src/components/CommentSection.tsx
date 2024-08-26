import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField, Button, Typography } from '@mui/material';

interface Comment {
  id: number;
  content: string;
  user: { username: string };
}

interface CommentSectionProps {
  topicId: number;
  comments: Comment[];
  onAddComment: (topicId: number, content: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ topicId, comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(topicId, newComment);
      setNewComment('');
    }
  };

  return (
    <div>
      <Typography variant="h6">Comments</Typography>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText
              primary={comment.content}
              secondary={`By ${comment.user.username}`}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Add a comment"
        multiline
        rows={2}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleAddComment}>
        Add Comment
      </Button>
    </div>
  );
};

export default CommentSection;