import React, { useState } from 'react';

import Input from '../../components/input/Input';
import { useHistory } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import { registerUser } from '../../api';

import './Register.scss';

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

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  let history = useHistory();

  async function onSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await registerUser(username, password, email);

      if (!result.ok) {
        setError(result.data.errors);
      } else {
        setError(null);
        setSuccess(true);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function onUsernameChange(e) {
    const { target: { value = '' } = {} } = e;
    setUsername(value);
  }

  function onPasswordChange(e) {
    const { target: { value = '' } = {} } = e;
    setPassword(value);
  }

  function onEmailChange(e){
    const { target: { value = '' } = {} } = e;
    setEmail(value);
  }

  function onClick(e) {
    history.push('/login');
  }

  const hasError = (f) => Boolean(error && error.find((i) => i.field === f));

  return (
    <ThemeProvider theme={theme}>
      <div className="register">
        <div className="register__row">
          <div className="register__col">
            <h1 className="register__heading">Nýskráning</h1>

            {loading && (
              <p>Skrái notanda...</p>
            )}

            {success && (
              <p>Notandi búinn til!</p>
            )}

            {!loading && !success && (
              <form className="register__form" onSubmit={onSubmit}>
                {error && (
                  <ul className="register__error">
                    {error.map((e, i) => (
                      <li key={i}>
                        <label htmlFor={e.field}>{e.field}, {e.error}</label>
                      </li>
                    ))}
                  </ul>
                )}
                <Input
                  className="register__input"
                  label="Notendanafn"
                  name="username"
                  value={username}
                  invalid={hasError('username')}
                  onChange={onUsernameChange}
                />

                <Input
                  className="register__input"
                  type="password"
                  label="Lykilorð"
                  name="password"
                  value={password}
                  invalid={hasError('password')}
                  onChange={onPasswordChange}
                />

                <Input
                  className="register__input"
                  label="Netfang"
                  name="email"
                  value={email}
                  invalid={hasError('email')}
                  onChange={onEmailChange}
                />

                <Button color="primary" variant="contained" className="register__button" disabled={loading} onClick={onSubmit}>Nýskrá</Button>
              </form>
            )}
            <Button color="primary" onClick={onClick}>Innskráning</Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
