import React from 'react';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

import Header from './Header';

function PageLayout() {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default PageLayout;
