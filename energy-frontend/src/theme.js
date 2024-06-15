import { createTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      contrastText: '#fff',
      main: '#3f51b5'
    },
    secondary: {
      contrastText: '#fff',
      main: '#f50057'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  typography: {
    fontFamily: "'Roboto', sans-serif"
  }
});

export default theme;
