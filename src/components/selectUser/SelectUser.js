import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { listUsers } from '../../api';
import './SelectUser.scss';

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
  const [user, setUser] = useState('');

  function handleChange(event) {
    setUser(event.target.value);
    props.updateUserId(event.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      const result = await listUsers();
      for(let i = 0; i < result.data.length; i++) {
        props.updateUsers(result.data[i].id, result.data[i].username);
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
            value={user}
            onChange={handleChange}
            input={<Input id="select-simple" />}
          >
            {props.users.map((user, index) =>
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