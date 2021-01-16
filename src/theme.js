import { createMuiTheme } from '@material-ui/core/styles';
import black from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: black[500],
    },
    secondary: {
      main: '#1DB954',
      contrastText: '#fff',
    },
  },
});

export default theme;
