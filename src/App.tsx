import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import theme from './theme';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import TopicList from './components/TopicList';
import CreateTopic from './components/CreateTopic';

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId="901399407997-srevnn8uji1ifk2bmomb3pitacj6jjv7.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/topics" element={<TopicList />} />
            <Route path="/create-topic" element={<CreateTopic />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;