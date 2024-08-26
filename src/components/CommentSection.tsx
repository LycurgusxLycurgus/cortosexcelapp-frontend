import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, TextField, Button, Typography } from '@mui/material';
import { addComment } from '../api/api';

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

const CommentSection: React.FC<CommentSectionProps> = ({ topicId, comments: initialComments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const addedComment = await addComment(topicId, newComment, token);
          setComments([...comments, addedComment]);
          setNewComment('');
          onAddComment(topicId, newComment);
        } catch (error) {
          console.error('Failed to add comment:', error);
        }
      }
    }
  };

  return (
    <div>
      <Typography variant="h6">Comments</Typography>
      {comments.length === 0 ? (
        <Typography variant="body2">No comments yet.</Typography>
      ) : (
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
      )}
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