import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login, googleSignIn } from '../api/api';
import { GoogleLogin } from '@react-oauth/google';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/topics');
    }
  }, [navigate]);

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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const result = await googleSignIn(credentialResponse.credential);
      localStorage.setItem('token', result.access_token);
      navigate('/topics');
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  };

  const handleGoogleFailure = () => {
    console.error('Google sign-in error:');
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
        <Divider sx={{ width: '100%', my: 2 }}>Or</Divider>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          useOneTap
        />
      </Box>
    </Container>
  );
};

export default Login;