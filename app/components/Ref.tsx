import React, { useState, useEffect } from 'react';
import { Topic } from '../../src/types';

function AIChatHistory() {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [topicId, setTopicId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the topic when the component mounts or topicId changes
    if (topicId) {
      fetchTopic(topicId);
    }
  }, [topicId]);

  const fetchTopic = async (id: string) => {
    try {
      const response = await fetch(`/api/topics/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTopic(data);
      }
    } catch (error) {
      console.error('Error fetching topic:', error);
    }
  };

  const toggleDiscussed = async () => {
    if (!topic || !topicId) return;

    try {
      const updatedTopic = { ...topic, discussed: !topic.discussed };
      const response = await fetch(`/api/topics/${topicId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTopic),
      });
      if (response.ok) {
        setTopic(updatedTopic);
      }
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  if (!topic) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{topic.title}</h2>
      <p>{topic.description}</p>
      <button
        onClick={toggleDiscussed}
        className={`px-4 py-2 rounded ${
          topic.discussed
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-red-500 hover:bg-red-600'
        } text-white`}
      >
        {topic.discussed ? 'Discussed' : 'Undiscussed'}
      </button>
      {/* Add other components or logic for displaying chat history */}
    </div>
  );
}

export default AIChatHistory;