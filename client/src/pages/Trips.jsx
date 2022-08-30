import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { TripsContext } from '../contexts/trips.context';
import { AuthContext } from '../contexts/auth.context';
import EB from '../components/ErrorBoundary';

function Trips() {
  const {
    fetchTrips, trips, loaded, loading, deleteTrip,
  } = useContext(TripsContext);
  const { accessToken } = useContext(AuthContext);
  useEffect(() => {
    console.log('HERRERERERE', { trips, loaded, loading });
    if (!loaded && !loading) {
      console.log('fetching');
      fetchTrips();
    }
  });

  return (
    <EB>
      <div>
        <Typography variant="h1">Trips</Typography>
        {/* <pre>
        <code>{JSON.stringify({ trips, loaded, loading })}</code>
      </pre> */}
        <div>
          <p>{accessToken}</p>
          <Button
            sx={{
              my: 2,
              '&:hover': {
                color: 'white',
              },
            }}
            component={Link}
            to="/trips/add"
            primary="true"
            variant="contained"
          >
            Add a trip!
          </Button>
        </div>
        {trips?.length === 0 && <p>No trips listed</p>}
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List>
            {trips.map(({ date, place, _id }) => (
              <ListItem disablePadding key={_id}>
                {place.name.common}
                {' '}
                (Date:
                {dayjs(date).format('DD/MM/YYYY')}
                )
                <IconButton aria-label="delete" color="primary" onClick={() => deleteTrip(_id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
    </EB>
  );
}

export default Trips;
