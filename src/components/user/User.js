import React, { Fragment } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { Context } from '../../UserContext';

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
}));

export default function User() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  let history = useHistory();


  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = (logoutUser) => (e) => {
    e.preventDefault();
    logoutUser();
  }

  function toNewProgram() {
    setAnchorEl(null);
    history.push('/program');
  }

  function toNewClient() {
    setAnchorEl(null);
    history.push('/newClient');
  }

  return (
    <Context.Consumer>
      {({ user, authenticated, logoutUser }) => {

        if (!authenticated) {
          return (
            <ThemeProvider theme={theme}>
              <Fragment>
                <NavLink exact to="/client/programs">
                  <Button color="secondary">Skoða Æfingarprógram</Button>
                </NavLink>
                <NavLink activeClassName="user__link--selected" className="user__link" to="/register">
                  <Button color="secondary">Nýskrá</Button>
                </NavLink>
                <NavLink activeClassName="user__link--selected" className="user__link" to="/login">
                  <Button color="secondary">Innskrá</Button>
                </NavLink>
              </Fragment>
            </ThemeProvider>
          )
        }

        return (
          <div>
            <Toolbar>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={toNewProgram}>Nýtt Æfingarprógram</MenuItem>
                <MenuItem onClick={toNewClient}>Nýr Skjólstæðingur</MenuItem>
                <MenuItem onClick={onClick(logoutUser)}>Útskrá</MenuItem>
              </Menu>
            </Toolbar>
          </div>
        );
      }}
    </Context.Consumer>
  );
}