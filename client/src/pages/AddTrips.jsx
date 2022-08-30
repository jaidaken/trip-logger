import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import TripForm from '../components/forms/TripForm';

function Trips() {
  return (
    <div>
      <Typography variant="h1">Add a Trip</Typography>
      <Button
        sx={{
          my: 2,
          '&:hover': {
            color: 'white',
          },
        }}
        component={Link}
        to="/trips"
        primary="true"
        variant="contained"
      >
        Back to trips...
      </Button>
      <TripForm />
    </div>
  );
}

export default Trips;
