import axios from 'axios';
import { useEffect, useState } from 'react';
import ThreeDots from './three-dots';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    margin: '0 30px',
  },
}));

const QueueList = ({ roomId }) => {
  const [data, setData] = useState({ hits: [] });
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [checked, setChecked] = useState([0]);

  useEffect(() => {
    // TODO: replace with firestore call!
    async function fetchData() {
      const result = await axios('https://hn.algolia.com/api/v1/search?query=redux');

      setData(result.data);
      setLoading(false);
    }
    fetchData();
  }, [roomId]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      {!loading ? (
        <List className={classes.root}>
          {data.hits.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={
                    <Typography variant="body2" style={{ fontWeight: '900' }}>
                      {value.url}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      ) : (
        <ThreeDots />
      )}
    </>
  );
};

export default QueueList;
