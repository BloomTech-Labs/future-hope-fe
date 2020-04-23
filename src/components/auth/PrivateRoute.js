import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = window.localStorage.getItem('UID');
  return (
    <Route
      {...rest}
      render={props => {
        if (token) {
          // return the component
          return <Component {...props} />;
        } else {
          // redirect the user to /login
          alert('Please Log in!')
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
