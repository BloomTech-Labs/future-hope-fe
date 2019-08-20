import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { login } from "../../actions/auth.js";
import Button from "@material-ui/core/Button";

import "./Login.scss";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    loginWithEmail: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  toggleEmailLogin = e => {
    e.preventDefault();
    this.setState({
      loginWithEmail: true
    });
  };

  render() {
    return (
      <div className='login-container'>
        <Button variant='contained' color='secondary'>
          Login with Google
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={e => this.toggleEmailLogin(e)}
        >
          Login with Email
        </Button>
        <div
          className={`email-login-container ${
            this.state.loginWithEmail ? "" : "hidden"
          }`}
        >
          <h3>Please Login</h3>
          <form>
            <TextField
              required
              id='standard-required-email-input'
              label='Email'
              margin='normal'
              type='email'
              name='email'
              autoComplete='email'
            />
            <TextField
              required
              id='standard-password-input'
              label='Password'
              margin='normal'
              type='password'
              name='password'
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
