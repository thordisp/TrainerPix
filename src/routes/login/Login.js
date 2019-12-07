import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/input/Input';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import { Context } from '../../UserContext';

import './Login.scss';

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

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');  // eslint-disable-next-line
  const [loading, setLoading] = useState(false); // eslint-disable-next-line
  const [error, setError] = useState(null);

  let history = useHistory();

  const onSubmit = (loginUser) => async (e) => {
    e.preventDefault();

    loginUser(username, password);
  }

  function onUsernameChange(e) {
    const { target: { value = '' } = {} } = e;
    setUsername(value);
  }

  function onPasswordChange(e) {
    const { target: { value = '' } = {} } = e;
    setPassword(value);
  }

  function onClick(e) {
    history.push('/register');
  }

  const hasError = (f) => Boolean(error && error.find((i) => i.field === f));

  const usernameInvalid = hasError('username');
  const passwordInvalid = hasError('password');

  return (
    <Context.Consumer>
      {({ message, loginUser, fetching, authenticated }) => {
        return (
          <ThemeProvider theme={theme}>
          <div className="login">
            <div className="login__row">
              <div className="login__col">
                <h1 className="login__heading">Innskráning</h1>
                {message && typeof message === 'string' && (
                  <p>{message}</p>
                )}

                {message && Array.isArray(message) && (
                  <ul className="login__error">
                    {message.map((e, i) => (
                      <li key={i}>
                        <label htmlFor={e.field}>{e.field}, {e.error}</label>
                      </li>
                    ))}
                  </ul>
                )}

                {authenticated && (
                  <p>Notandi innskráður!</p>
                )}

                {fetching && (
                  <p>Skrái inn <em>{username}</em>...</p>
                )}

                {!authenticated && !fetching && (
                    <form className="login__form" onSubmit={onSubmit(loginUser)}>
                      <Input
                        className="login__input"
                        label="Notendanafn"
                        name="username"
                        value={username}
                        invalid={usernameInvalid}
                        onChange={onUsernameChange}
                      />

                      <Input
                        className="login__input"
                        type="password"
                        label="Lykilorð"
                        name="password"
                        value={password}
                        invalid={passwordInvalid}
                        onChange={onPasswordChange}
                      />

                      <Button color="primary" variant="contained" className="login__button" disabled={loading} type="submit">Skrá inn</Button>
                    </form>
                )}
                <Button color="primary" onClick={onClick}>Nýskráning</Button>
              </div>
            </div>
          </div>
          </ThemeProvider>
        );
      }}
    </Context.Consumer>
  );
}
