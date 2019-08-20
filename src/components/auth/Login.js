import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { login } from "../../actions/auth.js";
import Button from "@material-ui/core/Button";

import "./Login.scss";

class Login extends React.Component {
  state = {
    user: {
      email: "",
      password: ""
    },
    loginWithEmail: false
  };

  handleChange = e => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    console.log("inside handlesubmit success");
    // e.preventDefault();
    this.props.login(this.state.user);
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
          <form onSubmit={this.handleSubmit}>
            <TextField
              required
              id='standard-required-email-input'
              label='Email'
              margin='normal'
              type='email'
              name='email'
              autoComplete='email'
              value={this.state.user.email}
              onChange={this.handleChange}
            />
            <TextField
              required
              id='standard-password-input'
              label='Password'
              margin='normal'
              type='password'
              name='password'
              value={this.state.user.password}
              onChange={this.handleChange}
            />
            <Button
              variant='outlined'
              size='large'
              color='primary'
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: creds => dispatch(login(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
