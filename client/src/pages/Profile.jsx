import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@mui/material/Typography';

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <section className="profileHeadline">
          <img src={user.picture} alt={user.name} />
          <Typography variant="h2">{user.name}</Typography>
        </section>
        <section>
          <NavLink
            style={{ textDecoration: 'none', color: 'inherit' }} 
            className="navlink"
            sx={{ fontSize: 5 }} 
            to="/trips">
            My trips
          </NavLink>
        </section>
      </div>
    )
  );
}

export default Profile;
