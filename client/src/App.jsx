/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Auth0Provider } from '@auth0/auth0-react';

import theme from './theme';

import PageLayout from './components/PageLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Auth0Wrapper from './components/Auth0Wrapper';
import EB from './components/ErrorBoundary';

// import ErrorBoundary from "./components/ErrorBoundary";

import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Trips from './pages/Trips';
import AddTrips from './pages/AddTrips';

// Data Contexts
import { AuthProvider } from './contexts/auth.context';
import { PlacesProvider } from './contexts/Places.context';
import { UsersProvider } from './contexts/Users.context';
import { TripsProvider } from './contexts/Trips.context';

// UI Context
import { UIProvider } from './contexts/Ui.context';

// Auth0 settings
import history from './utils/history';
import { getConfig } from './config';

const onRedirectCallback = (appState) => {
  history.push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
};
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
  onRedirectCallback,
};

function App() {
  return (
    <Router>
      <Auth0Provider {...providerConfig}>
        <Auth0Wrapper>
          <UIProvider>
            <AuthProvider>
              <PlacesProvider>
                <UsersProvider>
                  <TripsProvider>
                    <CssBaseline enableColorScheme />
                    <ThemeProvider theme={theme}>
                      <Routes>
                        <Route path="/" element={<PageLayout />}>
                          <Route index element={<Home />} />
                          <Route
                            path="profile"
                            element={(
                              <ProtectedRoute>
                                <Profile />
                              </ProtectedRoute>
                            )}
                          />
                          <Route
                            path="trips"
                            element={(
                              <ProtectedRoute>
                                <EB>
                                  <Trips />
                                </EB>
                              </ProtectedRoute>
                            )}
                          />
                          <Route
                            path="trips/add"
                            element={(
                              <ProtectedRoute>
                                <AddTrips />
                              </ProtectedRoute>
                            )}
                          />
                          <Route path="*" element={<NotFound />} />
                        </Route>
                      </Routes>
                    </ThemeProvider>
                  </TripsProvider>
                </UsersProvider>
              </PlacesProvider>
            </AuthProvider>
          </UIProvider>
        </Auth0Wrapper>
      </Auth0Provider>
    </Router>
  );
}

export default App;
