import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField, Typography, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArcadeButton, PixelatedBox, ArcadeTextArea } from './ArcadeComponents';

interface Comment {
  id: number;
  content: string;
  user?: { username: string };
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

  const formatComment = (content: string) => {
    // Split the content into words
    const words = content.split(/\s+/);
    return words.map((word, index) => {
      if (word.startsWith('http://') || word.startsWith('https://') || word.startsWith('@http')) {
        return (
          <React.Fragment key={index}>
            <a
              href={word.startsWith('@') ? word.slice(1) : word}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                wordBreak: 'break-all',
                color: '#00ff00',
                textDecoration: 'underline',
              }}
            >
              {word}
            </a>{' '}
          </React.Fragment>
        );
      }
      return word + ' ';
    });
  };

  return (
    <PixelatedBox>
      <Typography variant="h6">Comments</Typography>
      <Box sx={{
        maxHeight: '300px',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#000',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#00ff00',
          borderRadius: '5px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#00cc00',
        },
      }}>
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
                    primary={formatComment(comment.content)}
                    secondary={`${comment.user?.username || 'Unknown user'} - ${new Date(comment.createdAt).toLocaleString()}`}
                    primaryTypographyProps={{
                      style: {
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word',
                      }
                    }}
                    secondaryTypographyProps={{
                      style: {
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word',
                      }
                    }}
                  />
                </ListItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
      </Box>
      <form onSubmit={handleSubmit}>
        <ArcadeTextArea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          sx={{ width: '100%', marginTop: 2, marginBottom: 2 }}
        />
        <ArcadeButton type="submit" variant="contained" color="primary">
          Add Comment
        </ArcadeButton>
      </form>
    </PixelatedBox>
  );
};

export default CommentSection;