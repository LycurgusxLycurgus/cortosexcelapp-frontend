import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopics, updateTopic, toggleDiscussed, archiveTopic, addComment, createTopic } from '../../api/api';
import { Topic } from './types';

const useTopicList = (onAction: () => void) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(() => {
    const stored = localStorage.getItem('expandedTopics');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const navigate = useNavigate();

  const fetchTopics = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        setLoading(true);
        const fetchedTopics = await getTopics(token);
        setTopics(fetchedTopics);
      } catch (error) {
        console.error('Failed to fetch topics:', error);
      } finally {
        setLoading(false);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  useEffect(() => {
    localStorage.setItem('expandedTopics', JSON.stringify(Array.from(expandedTopics)));
  }, [expandedTopics]);

  const handleExpandTopic = (topicId: number) => {
    setExpandedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const handleAddComment = async (topicId: number, content: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const addedComment = await addComment(topicId, content, token);
        setTopics(prevTopics =>
          prevTopics.map(topic =>
            topic.id === topicId
              ? {
                  ...topic,
                  comments: [
                    ...topic.comments,
                    {
                      ...addedComment,
                      user: addedComment.user || { username: 'Unknown user' }
                    }
                  ]
                }
              : topic
          )
        );
        onAction();
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  };

  const handleEditTopic = async (id: number, content: string, priority: number) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await updateTopic(id, content, priority, token);
        fetchTopics();
        setEditingTopic(null); // Close the edit dialog
        onAction(); // Trigger the onAction callback
      } catch (error) {
        console.error('Failed to update topic:', error);
      }
    }
  };

  const handleToggleDiscussed = async (id: number) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await toggleDiscussed(id, token);
        fetchTopics();
      } catch (error) {
        console.error('Failed to toggle discussed:', error);
      }
    }
  };

  const handleArchiveTopic = async (id: number) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await archiveTopic(id, token);
        fetchTopics();
      } catch (error) {
        console.error('Failed to archive topic:', error);
      }
    }
  };

  const handleCreateTopic = async (content: string, priority: number) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await createTopic(content, priority, token);
        fetchTopics();
        onAction();
      } catch (error) {
        console.error('Failed to create topic:', error);
      }
    }
  };

  return {
    topics,
    loading,
    editingTopic,
    expandedTopics,
    handleExpandTopic,
    handleEditTopic,
    handleToggleDiscussed,
    handleArchiveTopic,
    handleAddComment,
    handleCreateTopic,
  };
};

export default useTopicList;