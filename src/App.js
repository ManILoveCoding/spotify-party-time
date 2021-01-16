import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={4}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
