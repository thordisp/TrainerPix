import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

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

export default function User() {

  const onClick = (logoutUser) => (e) => {
    e.preventDefault();
    logoutUser();
  }

  return (
    <Context.Consumer>
      {({ user, authenticated, logoutUser }) => {


        if (!authenticated) {
          return (
            <ThemeProvider theme={theme}>
              <Fragment>
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
          <p className="user__info">
            <NavLink
              activeClassName="user__link--selected"
              className="user__link" to="/logout"
              onClick={onClick(logoutUser)}
            >
              <Button color="secondary">{user.user.username} (útskrá)</Button>
            </NavLink>
          </p>
        );
      }}
    </Context.Consumer>
  );
}