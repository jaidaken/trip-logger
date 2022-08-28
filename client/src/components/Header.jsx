import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import { useAuth0 } from '@auth0/auth0-react';

function Header() {
  const { loginWithRedirect, logout, user } = useAuth0();
  const loginFn = () => loginWithRedirect();
  const logoutFn = () => logout({ returnTo: window.location.origin });
  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            sx={{
              my: 2,
              color: 'white',
              display: 'block',
              '&:hover': {
                color: 'yellow',
              },
            }}
            component={NavLink}
            to="/"
          >
            Trip Logger
          </Button>

          <Button
            sx={{
              my: 2,
              color: 'white',
              display: 'block',
              '&:hover': {
                color: 'yellow',
              },
            }}
            component={NavLink}
            to="/profile"
          >
            Profile
          </Button>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          />
          {user ? (
            <Button
              sx={{
                backgroundColor: 'white',
                boxShadow: '4px 4px hsla(359, 96%, 24%, 0.4)',
                '&:hover': {
                  backgroundColor: 'yellow',
                  boxShadow: '2px 2px hsla(359, 96%, 24%, 0.8)',
                },
              }}
              onClick={logoutFn}
            >
              Log Out
            </Button>
          ) : (
            <Button
              sx={{
                backgroundColor: 'white',
                boxShadow: '4px 4px hsla(359, 96%, 24%, 0.4)',
                '&:hover': {
                  backgroundColor: 'yellow',
                  boxShadow: '2px 2px hsla(359, 96%, 24%, 0.8)',
                },
              }}
              onClick={loginFn}
            >
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
