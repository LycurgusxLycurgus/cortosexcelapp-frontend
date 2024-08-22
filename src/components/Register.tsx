import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register, googleSignIn } from '../api/api';
import { GoogleLogin } from '@react-oauth/google';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (pwd: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError('Password must contain at least 8 characters, including uppercase, lowercase, number, and symbol.');
      return;
    }

    try {
      await register(username, password);
      navigate('/login');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
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
          Register
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
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
            Register
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

export default Register;