import React, { useState } from 'react';

import Input from '../../components/input/Input';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';

import { registerUser } from '../../api';

import './Register.scss';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await registerUser(username, password, email);

      console.log('register result: ' + result.data.errors);

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

  const hasError = (f) => Boolean(error && error.find((i) => i.field === f));

  return (
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

              <Button className="register__button" disabled={loading}>Nýskrá</Button>
            </form>
          )}

          <p><Link className="register__link" to="/login">Innskráning</Link></p>
        </div>
      </div>
    </div>
  );
}
