import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../TrainerPixLogo4.png';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import User from '../user/User';

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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.title}>
              <NavLink exact to="/">
                <img src={logo} alt="Logo" />
              </NavLink>
            </Typography>
            <NavLink exact to="/about">
              <Button color="secondary">Um Okkur</Button>
            </NavLink>
            <NavLink exact to="/program">
              <Button color="secondary">Nýtt Prógram</Button>
            </NavLink>
            <User />
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
