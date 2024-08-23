import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Container } from '@mui/material';
import AppBar from './app/layout/AppBar';
import Drawer from './app/layout/Drawer';
import Dashboard from './app/layout/Dashboard';

import Footer from './app/layout/Footer';
import NotFound from './features/error/NotFound';
import { useAppSelector } from './app/store/hooks';
import ProtectedRoute from './app/router/ProtectedRouter';
import SignIn from './features/auth/SignIn';
import SignUp from './features/auth/SignUp';


const renderAuthenticatedLayout = () => (
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar />
    <Drawer />
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </Box>
  </Box>
);

const renderUnAuthenticatedLayout = () => (
  <Container maxWidth="sm">
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<SignIn />} />
    </Routes>
  </Container>
);

const App: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.security.isAuthenticated);

  return (
    <Router>
      {isAuthenticated ? renderAuthenticatedLayout() : renderUnAuthenticatedLayout()}
    </Router>
  );
};

export default App;

