import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, props, ...rest }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  if(user.token != null) {
    props.setState({ authed: true });
  } else {
    props.setState({ authed: false });
  }

  return (
    <Route
      {...rest}
      render={(props) => props.authed === true
        ? (
        <Component {...props} />
        ) : (
        <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        )
      }
    />
  )
}

export default PrivateRoute