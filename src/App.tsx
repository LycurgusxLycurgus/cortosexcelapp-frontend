import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AnimatePresence } from 'framer-motion';
import theme from './theme';
import ArcadeLayout from './components/ArcadeLayout';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import { TopicList } from './components/TopicList';
import ExperienceBar from './components/ExperienceBar';

const App: React.FC = () => {
  const [experience, setExperience] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [overflowClicks, setOverflowClicks] = useState(0);

  useEffect(() => {
    if (experience > 20) {
      setOverflowClicks((prev) => prev + 1);
    }
  }, [experience]);

  useEffect(() => {
    if (overflowClicks >= 3) {
      setExperience(0);
      setOverflowClicks(0);
    }
  }, [overflowClicks]);

  const handleExperienceGain = () => {
    setExperience((prevExperience) => prevExperience + 1);
  };

  return (
    <GoogleOAuthProvider clientId="901399407997-srevnn8uji1ifk2bmomb3pitacj6jjv7.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ backgroundColor: '#000', minHeight: '100vh' }}>
          <Router>
            <ArcadeLayout>
              <Header focusMode={focusMode} setFocusMode={setFocusMode} onAction={handleExperienceGain} />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/login" element={<Login onAction={handleExperienceGain} />} />
                  <Route path="/register" element={<Register onAction={handleExperienceGain} />} />
                  <Route 
                    path="/topics" 
                    element={
                      <TopicList 
                        focusMode={focusMode} 
                        onAction={handleExperienceGain} 
                      />
                    } 
                  />
                  <Route 
                    path="/" 
                    element={
                      <TopicList 
                        focusMode={focusMode} 
                        onAction={handleExperienceGain} 
                      />
                    } 
                  />
                </Routes>
              </AnimatePresence>
              {!focusMode && <ExperienceBar experience={experience} overflowClicks={overflowClicks} />}
            </ArcadeLayout>
          </Router>
        </Box>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;