import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import { addProgram } from '../../api';
import { listClients } from '../../api';
import './ProgramForm.scss';

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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    width: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [data, setData] = useState({ name: '' });
  const [clients, setClients] = useState(0);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  let history = useHistory();

  /**
   * Creates a new program with name, clientId and link.
   * Gets programId from response and redirects user to /program/:programId/add.
   * @param {*} e
   */
  async function onSubmit(e) {
    e.preventDefault();

    // Get userId (trainer).
    const user = JSON.parse(localStorage.getItem('user'));

    // Create a link to where the exercises are added to program.
    const programLink = `/program/${clients}/view`;

    const created = await addProgram(user.user.id, clients, data.name, programLink, user);

    if (!created.ok) {
      // setErrors(created.result);
      console.log('Villa við að búa til prógramm.');
      console.log('Villa: ' + created.result);
    } else {
      console.log('Nýtt prógramm hefur verið búið til.');
    }
    // get programId from results.
    const programId = created.result.id;

    history.push(`/program/${programId}/add/${clients}`);
  }

  // Set the value of program name.
  function onChange(e) {
    const newData = Object.assign({}, data);
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  // Select a client.
  function handleChange(e) {
    setClients(e.target.value);
    props.updateClientId(e.target.value.id);
  }

  // Get all clients to appear in select menu.
  // Todo: Birta aðeins skjólstæðinga sem viðeigandi trainer á.
  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem('user'));
      if(!user) {
        history.push('/access_denied');
      } else {
        const result = await listClients(user.user.id, user.user);
        for(let i = 0; i < result.data.length; i++) {
          props.updateClients(result.data[i].id, result.data[i].name);
        }
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="SelectContainer">
        <h1>Nýtt Æfingarprógramm</h1>
        <form className={classes.root} onSubmit={onSubmit} autoComplete="off">
          <div>
            <TextField
              id="name"
              name="name"
              className={classes.textField}
              label="Nafn Æfingarprógramms"
              margin="normal"
              onChange={onChange}
              variant="outlined"
            />
          </div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="select-simple">Skjólstæðingur</InputLabel>
            <Select
              value={clients}
              onChange={handleChange}
              input={<OutlinedInput labelWidth={labelWidth} name="Skjólstæðingur" id="select-simple" />}
            >
              {props.clients.map((user, index) =>
                <MenuItem key={index} value={user.id}>
                  {user.username}
                </MenuItem>
                )}
            </Select>
          </FormControl>
          <div className="buttonWrapper">
            <Button color="primary" variant="contained" type="submit">Búta til prógramm</Button>
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
}