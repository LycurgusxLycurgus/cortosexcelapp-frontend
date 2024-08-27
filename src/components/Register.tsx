import React, { useState } from 'react';
import { TextField, Typography, Container, Box, Alert, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { register } from '../api/api';
import { motion } from 'framer-motion';
import { ArcadeButton, PixelatedBox } from './ArcadeComponents';

interface Props {
  onAction: () => void;
}

const Register: React.FC<Props> = ({ onAction }) => {
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
      onAction(); // Call onAction after successful registration
      navigate('/login');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log(credentialResponse);
    // Here you would typically send the credential to your backend
    // and receive a token in response. For now, we'll just navigate to topics.
    navigate('/topics');
  };

  const handleGoogleError = () => {
    console.log('Registration Failed');
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
              <ArcadeButton type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Register
              </ArcadeButton>
            </Box>
            <Divider sx={{ width: '100%', my: 2 }}>OR</Divider>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </Box>
        </PixelatedBox>
      </motion.div>
    </Container>
  );
};

export default Register;