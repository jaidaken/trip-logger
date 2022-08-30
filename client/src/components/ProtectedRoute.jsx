/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import intersection from 'lodash.intersection';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function ProtectedRoute({ children, permissions: requiredPerms = [] }) {
  let authd = false;
  const { user, isLoading } = useAuth0();
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  if (user) {
    const domainPerms = user[`${window.location.origin}/user_authorization`];
    if (!requiredPerms.length) {
      authd = true;
    } else if (domainPerms && intersection(domainPerms.permissions, requiredPerms).length > 0) {
      authd = true;
    }
  }
  if (!authd) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
