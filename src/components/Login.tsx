import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { login, googleSignIn } from '../api/api';

const Login: React.FC = () => {
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
      navigate('/topics');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleGoogleLogin = () => {
    googleSignIn();
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
        </Box>
        <Divider sx={{ width: '100%', my: 2 }}>OR</Divider>
        <Button onClick={handleGoogleLogin} fullWidth variant="contained" color="secondary">
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login;