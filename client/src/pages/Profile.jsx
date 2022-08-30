import React from 'react';
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
        <Typography variant="h1">Profile</Typography>
        <img src={user.picture} alt={user.name} />
        <Typography variant="h2">{user.name}</Typography>
        <p>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
        <pre>
          <code>{JSON.stringify(user, null, 2)}</code>
        </pre>
      </div>
    )
  );
}

export default Profile;
