import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import { addExercise } from '../../api';
import Button from '../button/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  card: {
    width: 200,
  },
  media: {
    height: 140,
  },
}));

export default function Form(props) {
  const classes = useStyles();

  const [data, setData] = useState({ client: 0, sets: 0, reps: 0, description: '' });
  // const [errors, setErrors] = useState([]);

  async function onSubmit(e) {
    e.preventDefault();

    const created = await addExercise(data.client, data.sets, data.reps, data.description, props.image1, props.image2);

    if (!created.ok) {
      // setErrors(created.result);
      console.log('Villa við að bæta við æfingu.');
      console.log('Villa: ' + created.result);
    } else {
      setData({ client: 0, sets: 0, reps: 0, description: '' });
      console.log('Æfingu var bætt við.');
    }
  }

  function onChange(e) {
    const newData = Object.assign({}, data);
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  function toggleFirstCamera(e) {
    e.preventDefault();
    props.toggleFirstCam();
  }

  function toggleSecondCamera(e){
    e.preventDefault();
    props.toggleSecondCam();
  }

  return (
    <div className={classes.root}>
        <Container maxWidth="lg">
          <form className={classes.container} action="/program" method="post" onSubmit={onSubmit}>
            <div>
              <TextField
                id="client"
                className={classes.textField}
                label="Client"
                margin="normal"
                variant="outlined"
                type="text"
                name="client"
                onChange={onChange}
              />
            </div>
            <div>
            <TextField
                id="sets"
                className={classes.textField}
                label="Sets"
                margin="normal"
                variant="outlined"
                type="text"
                name="sets"
                onChange={onChange}
              />
            </div>
            <div>
            <TextField
                id="reps"
                className={classes.textField}
                label="Reps"
                margin="normal"
                variant="outlined"
                type="text"
                name="reps"
                onChange={onChange}
              />
            </div>
            <div>
            <TextField
                id="description"
                className={classes.textField}
                label="Description"
                margin="normal"
                multiline
                rowsMax="4"
                variant="outlined"
                type="text"
                name="description"
                onChange={onChange}
              />
            </div>
            {props.image1 === '' ? (
              <Button onClick={toggleFirstCamera}>First Image</Button>
            ) : (
              <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={props.image1}
                  title="First Image"
                />
              </CardActionArea>
              <CardActions>
                <Button>
                  Retake
                </Button>
              </CardActions>
            </Card>
            )}
            {props.image2 === '' ? (
              <Button onClick={toggleSecondCamera}>Second Image</Button>
            ) : (
              <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={props.image2}
                  title="Second Image"
                />
              </CardActionArea>
              <CardActions>
                <Button>
                  Retake
                </Button>
              </CardActions>
            </Card>
            )}
            <div>
              <Button>Submit</Button>
            </div>
          </form>
        </Container>
    </div>
  );
}