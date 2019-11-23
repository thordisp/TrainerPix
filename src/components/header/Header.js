import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../TrainerPixLogo6.png';
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
  button: {
    width: '200px',
    height: '75px',
    margin: '20px',
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home(props) {

  const classes = useStyles();

  let location = window.location.pathname;

  return (
    <div>
      {location === "/" ? (
          <div className="frontpage__container">
            <div className="frontpage__links">
              <ThemeProvider theme={theme}>
                <div className="frontpage__logo">
                  <NavLink exact to="/">
                    <img src={logo} alt="Logo" />
                  </NavLink>
                </div>
                <div className="frontpage__buttons">
                  <NavLink exact to="/login">
                    <Button className={classes.button} variant="contained" color="secondary">Þjálfari</Button>
                  </NavLink>
                  <NavLink exact to="/client/programs">
                    <Button className={classes.button} variant="contained" color="secondary">Skjólstæðingur</Button>
                  </NavLink>
                </div>
              </ThemeProvider>
            </div>
          </div>
      ) : (
        <div  className={classes.root}>
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
                <NavLink exact to="/client/programs">
                  <Button color="secondary">Skoða Æfingarprógram</Button>
                </NavLink>
                <NavLink exact to="/program">
                  <Button color="secondary">Nýtt Prógram</Button>
                </NavLink>
                <User />
              </Toolbar>
            </AppBar>
          </ThemeProvider>
        </div>
      )}
    </div>
  )
}
