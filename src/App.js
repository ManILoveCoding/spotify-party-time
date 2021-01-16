import logo from './logo.svg';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const App = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Grid>
  );
};

export default App;
