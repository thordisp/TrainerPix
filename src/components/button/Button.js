import React from 'react';
import PropTypes from 'prop-types';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import './Button.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#718792',
      main: '#455a64',
      dark: '#1c313a',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#9effff',
      main: '#64ffda',
      dark: '#14cba8',
      contrastText: '#000000',
    },
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default function ButtonComponent(props) {
  const { children, onClick } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Button color='primary' onClick={onClick}>
          {children}
        </Button>
      </ThemeProvider>
    </div>
  );
}

Error.propTypes = {
  onClick: PropTypes.func,
};