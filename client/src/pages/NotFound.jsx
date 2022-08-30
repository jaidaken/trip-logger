import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

function NotFound() {
  return (
    <>
      <Typography variant="h1">Not Found</Typography>
      <Link to="/">Back to home page</Link>
    </>
  );
}

export default NotFound;
