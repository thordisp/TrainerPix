import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../public/images/TrainerPixLogo6.png';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import User from '../user/User';
import './Header.scss';

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
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  Button: {
    fontSize: 'medium',
  }
}));

export default function Home(props) {

  const classes = useStyles();

  return (
    <div  className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.title}>
              <NavLink exact to="/">
                <img className="headerLogo" src={logo} alt="Logo" />
              </NavLink>
            </Typography>
            <User />
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  )
}
