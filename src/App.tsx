import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AnimatePresence } from 'framer-motion';
import theme from './theme';
import ArcadeLayout from './components/ArcadeLayout';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import TopicList from './components/TopicList';
import CreateTopic from './components/CreateTopic';
import ExperienceBar from './components/ExperienceBar';

const App: React.FC = () => {
  const [experience, setExperience] = useState(0);
  const [focusMode, setFocusMode] = useState(false);

  const handleExperienceGain = () => {
    setExperience((prevExperience) => Math.min(prevExperience + 1, 20));
  };

  return (
    <GoogleOAuthProvider clientId="901399407997-srevnn8uji1ifk2bmomb3pitacj6jjv7.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ArcadeLayout>
            <Header focusMode={focusMode} setFocusMode={setFocusMode} onAction={handleExperienceGain} />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/login" element={<Login onAction={handleExperienceGain} />} />
                <Route path="/register" element={<Register onAction={handleExperienceGain} />} />
                <Route path="/topics" element={<TopicList focusMode={focusMode} onAction={handleExperienceGain} />} />
                <Route path="/create-topic" element={<CreateTopic onAction={handleExperienceGain} />} />
                <Route path="/" element={<TopicList focusMode={focusMode} onAction={handleExperienceGain} />} />
              </Routes>
            </AnimatePresence>
            {!focusMode && <ExperienceBar experience={experience} />}
          </ArcadeLayout>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;