import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function classnames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
}));

export default function Input(props) {
  const { type = 'text', label, name, value, onChange, className = '', invalid = false } = props;

  const isTextarea = type === 'textarea';
  const isSelect = type === 'select';
  const isInput = !isTextarea && !isSelect;

  const classes = useStyles();

  return (
    <div className={classnames('input', invalid ? 'input--invalid' : '', className ? className : '')}>

        {isTextarea && (
          <TextField
            id={name}
            label="Multiline"
            multiline
            rows="4"
            className={classes.textField}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            margin="normal"
            variant="outlined"
          />
        )}

        {isInput && (
          <TextField
            id={name}
            label={label}
            className={classes.textField}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            margin="normal"
            variant="outlined"
          />
        )}

    </div>
  );
}