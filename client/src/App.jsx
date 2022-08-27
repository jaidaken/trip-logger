import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Auth0Provider } from '@auth0/auth0-react';

import theme from './theme';

import PageLayout from './components/PageLayout';
// import ErrorBoundary from "./components/ErrorBoundary";

import Home from './pages/Home';
import NotFound from './pages/NotFound';

// import { CarsProvider } from './contexts/car.context';

// Auth0 settings
const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
console.log('🚀 ~ file: App.jsx ~ line 20 ~ AUTH0_DOMAIN', AUTH0_DOMAIN);
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;
console.log('🚀 ~ file: App.jsx ~ line 22 ~ AUTH0_CLIENT_ID', AUTH0_CLIENT_ID);

function App() {
  return (
    <Router>
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
      >
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<PageLayout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Auth0Provider>
    </Router>
  );
}

export default App;
