import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '../button/Button';

import { addProgram } from '../../api';
import { listClients } from '../../api';
import './SelectClient.scss';
import { link } from 'fs';

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

  let history = useHistory()

  /**
   * Creates a new program with name, clientId and link.
   * Gets programId from response and redirects user to /program/:programId/add.
   * @param {*} e
   */
  async function onSubmit(e) {
    e.preventDefault();

    // Get userId (trainer).
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user: ' + user.user.id);

    // Create a random number for link.
    const linkNumber = Math.floor((Math.random() * 9999) + 1000);

    // Create a link to where the exercises are added to program.
    const programLink = `/program/${clients}/view/${linkNumber}`;

    const created = await addProgram(user.user.id, clients, data.name, programLink);

    if (!created.ok) {
      // setErrors(created.result);
      console.log('Villa við að búa til prógram.');
      console.log('Villa: ' + created.result);
    } else {
      console.log('Nýtt prógram hefur verið búið til.');
    }
    // get programId from results.
    const programId = created.result.id;

    history.push(`/program/${programId}/add`);
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
  useEffect(() => {
    async function fetchData() {
      const result = await listClients();
      for(let i = 0; i < result.data.length; i++) {
        props.updateClients(result.data[i].id, result.data[i].name);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="SelectContainer">
      <h1>Nýtt Æfingarprógram</h1>
      <form className={classes.root} onSubmit={onSubmit} autoComplete="off">
        <div>
          <TextField
            id="name"
            name="name"
            className={classes.textField}
            label="Nafn Æfingarprógrams"
            margin="normal"
            onChange={onChange}
          />
        </div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-simple">Skjólstæðingur</InputLabel>
          <Select
            value={clients}
            onChange={handleChange}
            input={<Input id="select-simple" />}
          >
            {props.clients.map((user, index) =>
              <MenuItem key={index} value={user.id}>
                {user.username}
              </MenuItem>
              )}
          </Select>
        </FormControl>
        <div>
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
}