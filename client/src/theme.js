import { createTheme } from '@mui/material/styles';
import red from '@mui/material/colors/red';
// import grey from '@mui/material/colors/grey';

const theme = createTheme({
  palette: {
    primary: {
      main: red[900],
      contrastText: '#fff',
    },
    secondary: {
      main: red[50],
      contrastText: red[900],
    },
  },
  typography: {
    // Tell MUI what's the font-size on the html element is.
    htmlFontSize: 12,
    h1: {
      fontSize: '3rem',
    },
  },
});

export default theme;
