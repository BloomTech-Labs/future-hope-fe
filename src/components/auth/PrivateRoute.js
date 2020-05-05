import React from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ user, approval, component: Component, ...rest }) => {
  const token = window.localStorage.getItem('UID');
  return (
    <Route
      {...rest}
      render={props => {
        if (token) {
          console.log(user)
          // return the component
          if (approval !== null && approval !== undefined) {
            return <Redirect to="/applicationstatus" />;
          } else {
            return <Component {...props} />;
          }
        } else {
          // redirect the user to /login
          alert('Please Log in!')
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    approval: state.auth.user.usersAwaitingApproval
  }
}

export default connect(mapStateToProps)(PrivateRoute);