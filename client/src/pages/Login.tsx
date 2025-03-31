import { useState } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import ErrorAlert from '../components/ErrorAlert';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (username: string, password: string) => {
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Movie Search
          </Typography>
          <Typography component="h2" variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          
          <ErrorAlert error={error} />
          
          <LoginForm onSubmit={handleSubmit} loading={loading} />
          
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Use admin / 1234 to login (hardcoded credentials)
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
