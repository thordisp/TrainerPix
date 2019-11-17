import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { listClients } from '../../api';
import './SelectClient.scss';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [clients, setClients] = useState('');

  function handleChange(event) {
    setClients(event.target.value);
    props.updateClientId(event.target.value);
  }

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
      <h3>Vinsamlegast veldu skjólstæðing: </h3>
      <form className={classes.root} autoComplete="off">
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
      </form>
    </div>
  );
}