import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme';

import PageLayout from './components/PageLayout';
// import ErrorBoundary from "./components/ErrorBoundary";

import Home from './pages/Home';
import NotFound from './pages/NotFound';

// import { CarsProvider } from './contexts/car.context';

function App() {
  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {/* <CarsProvider> */}
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="add" element={<AddCar />} />
                <Route path="update/:id" element={<UpdateCar />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        {/* </CarsProvider> */}
      </ThemeProvider>
    </Router>
  );
}

export default App;
