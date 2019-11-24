import React, { useState } from 'react';

import Input from '../../components/input/Input';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import { createClient } from '../../api';

import './NewClient.scss';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    setLoading(true);

    try {
      const result = await createClient(name, email, user);

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

  function onNameChange(e) {
    const { target: { value = '' } = {} } = e;
    setName(value);
  }

  function onEmailChange(e){
    const { target: { value = '' } = {} } = e;
    setEmail(value);
  }

  const hasError = (f) => Boolean(error && error.find((i) => i.field === f));

  return (
    <ThemeProvider theme={theme}>
      <div className="register">
        <div className="register__row">
          <div className="register__col">
            <h1 className="register__heading">Nýr Skjólstæðingur</h1>

            {loading && (
              <p>Skrái skjólstæðing...</p>
            )}

            {success && (
              <p>Skjólstæðingur búinn til!</p>
            )}

            {!loading && !success && (
              <form className="register__form" onSubmit={onSubmit}>
                {error && (
                  <div className="register__error">
                    {error.map((e, i) => (
                      <p key={i}>
                        <label htmlFor={e.field}>{e.field}, {e.error}</label>
                      </p>
                    ))}
                  </div>
                )}
                <Input
                  className="register__input"
                  label="Nafn"
                  name="name"
                  value={name}
                  invalid={hasError('name')}
                  onChange={onNameChange}
                />
                <Input
                  className="register__input"
                  label="Netfang"
                  name="email"
                  value={email}
                  invalid={hasError('email')}
                  onChange={onEmailChange}
                />

                <Button color="primary" variant="contained" className="register__button" disabled={loading} onClick={onSubmit}>Skrá skjólstæðing</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
