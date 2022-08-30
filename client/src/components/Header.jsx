import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth0 } from '@auth0/auth0-react';

function Header() {
  const { loginWithRedirect, logout, user } = useAuth0();
  const logoutFn = () => logout({ returnTo: window.location.origin });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            style={{ textDecoration: 'none', color: 'inherit' }}
            variant="h3"
            sx={{ flexGrow: 1 }}
            component={NavLink}
            to="/"
          >
            Trip Logger
          </Typography>
          <Button
            style={{ textDecoration: 'none', color: 'inherit' }}
            component={NavLink}
            to="/profile"
          >
            Profile
          </Button>
          {user ? (
            <Button
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={logoutFn}
            >
              Log Out
            </Button>
          ) : (
            <Button
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={loginWithRedirect}
            >
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    // <Box>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <Button
    //         component={NavLink}
    //         to="/"
    //       >
    //         Trip Logger
    //       </Button>
    //       <Box />
    //       <Button
    //         component={NavLink}
    //         to="/profile"
    //       >
    //         Profile
    //       </Button>
    //       {user ? (
    //         <Button onClick={logoutFn}>
    //           Log Out
    //         </Button>
    //       ) : (
    //         <Button onClick={loginWithRedirect}>
    //           Log In
    //         </Button>
    //       )}
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );
}

export default Header;
