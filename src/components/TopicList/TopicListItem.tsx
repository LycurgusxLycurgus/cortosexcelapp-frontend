import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import PrioritySelector from '../PrioritySelector';
import CommentSection from '../CommentSection';
import { Topic } from './types';

interface TopicListItemProps {
  topic: Topic;
  focusMode: boolean;
  expanded: boolean;
  onExpand: () => void;
  onEdit: (content: string, priority: number) => void;
  onToggleDiscussed: () => void;
  onArchive: () => void;
  onAddComment: (topicId: number, content: string) => void;
  onEditClick: () => void;
}

const TopicListItem: React.FC<TopicListItemProps> = ({
  topic,
  focusMode,
  expanded,
  onExpand,
  onEdit,
  onToggleDiscussed,
  onArchive,
  onAddComment,
  onEditClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <ListItem>
        <ListItemText
          primary={topic.content}
          secondary={`Created by ${topic.user.username} on ${format(new Date(topic.createdAt), 'PPP')}`}
        />
        {!focusMode && (
          <>
            <PrioritySelector priority={topic.priority} onChange={(newPriority) => onEdit(topic.content, newPriority)} />
            <Checkbox
              checked={topic.discussed}
              onChange={onToggleDiscussed}
              color="primary"
            />
            <IconButton onClick={onEditClick}>
              <EditIcon />
            </IconButton>
            {!topic.archived && (
              <IconButton onClick={onArchive}>
                <ArchiveIcon />
              </IconButton>
            )}
          </>
        )}
        <IconButton onClick={onExpand}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </ListItem>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <CommentSection
              topicId={topic.id}
              comments={topic.comments}
              onAddComment={onAddComment}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TopicListItem;