import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <pre><code>{JSON.stringify(user, null, 2)}</code></pre>
      <section>
        <h2>Trips</h2>
        <Link to="/trips">See your trips</Link>
      </section>
    </div>
    )
  );
}

export default Profile;
