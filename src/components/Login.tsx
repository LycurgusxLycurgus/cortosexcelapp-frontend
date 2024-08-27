import React, { useState, useEffect } from 'react';
import { TextField, Typography, Container, Box, Divider, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { login, googleSignIn } from '../api/api';
import { motion } from 'framer-motion';
import { ArcadeButton, PixelatedBox } from './ArcadeComponents';

interface Props {
  onAction: () => void;
}

const Login: React.FC<Props> = ({ onAction }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/topics');
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      localStorage.setItem('token', response.access_token);
      onAction(); // Call onAction after successful login
      navigate('/topics');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleGoogleLogin = () => {
    googleSignIn();
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    onAction(); // Call onAction after successful Google login
    navigate('/topics');
  };

  return (
    <Container maxWidth="xs">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PixelatedBox>
          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ArcadeButton type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
              </ArcadeButton>
            </Box>
            <Divider sx={{ width: '100%', my: 2 }}>OR</Divider>
            <ArcadeButton onClick={handleGoogleLogin} fullWidth variant="contained" color="secondary">
              Sign in with Google
            </ArcadeButton>
          </Box>
        </PixelatedBox>
      </motion.div>
    </Container>
  );
};

export default Login;