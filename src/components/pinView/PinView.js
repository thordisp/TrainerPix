import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';

import './PinView.scss';
import { getAccessToPrograms } from './../../api';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4f83cc',
      main: '#002f6c',
      dark: '#01579b',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#eeffff',
      main: '#bbdefb',
      dark: '#8aacc8',
      contrastText: '#000000',
    },
  },
});

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function PinView(props) {
  const classes = useStyles();

  const [inputPin, setInputPin] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onChange(e) {
    const newData = Object.assign({}, inputPin);
    newData[e.target.name] = e.target.value;
    setInputPin(newData);
  }

  async function onClick(e) {
    e.preventDefault();

    const result = await getAccessToPrograms(inputPin.pin);

    if(!result.ok) {
      console.log('Rangt pin.');
    } else {
        localStorage.setItem('pin', true);
        const client = result.data.client;
        const programs = result.data.programs;

        props.updateClient(client.id, client.name, client.email);

        for(let i = 0; i < programs.length; i++) {
          props.updateProgram(programs[i].id, programs[i].userId, programs[i].clientId, programs[i].name, programs[i].link)
        }
        props.updatePinCorrect(true);
    }
  }

  return (
    <div>
      <div className="pin_container">
        <ThemeProvider theme={theme}>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Opna æfingarprógram
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Staðfesta Aðgang</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vinsamlegast ritið hér að neðan gefið pin númer til að sjá æfingarprógram.
              </DialogContentText>
                <TextField
                  className={classes.margin}
                  id="pin"
                  label="Pin Númer"
                  name="pin"
                  onChange={onChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Hætta Við
              </Button>
              <Button onClick={onClick} color="primary">
                Staðfesta
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </div>
    </div>
  );
}
