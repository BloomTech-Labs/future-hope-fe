import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { signUp } from "../../actions/auth.js";
import Button from "@material-ui/core/Button";

class SignUp extends React.Component {
  state = {
    fullName: "",
    email: "",
    userType: this.props.type,
    city: "",
    stateProvince: "",
    country: "",
    phoneNumber: "",
    aboutMe: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  //! Reuse this component for all types of sign-ups - maybe have code here that shows only relevant text-fields
  render() {
    console.log(this.props.type);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h5>Sign Up as {this.props.type}</h5>
          <TextField
            required
            id='standard-name'
            label='Name'
            value={this.state.fullName}
            onChange={this.handleChange}
            margin='normal'
            name='fullName'
          />
          <TextField
            required
            id='standard-name'
            label='email'
            value={this.state.email}
            onChange={this.handleChange}
            margin='normal'
            name='email'
          />
          <TextField
            required
            id='standard-password-input'
            type='password'
            label='Password'
            value={this.state.password}
            onChange={this.handleChange}
            margin='normal'
            name='password'
          />
          <TextField
            required
            id='standard-name'
            label='City'
            value={this.state.city}
            onChange={this.handleChange}
            margin='normal'
            name='city'
          />
          <TextField
            required
            id='standard-name'
            label='State or Province'
            value={this.state.stateProvince}
            onChange={this.handleChange}
            margin='normal'
            name='stateProvince'
          />
          <TextField
            required
            id='standard-name'
            label='Country'
            value={this.state.country}
            onChange={this.handleChange}
            margin='normal'
            name='country'
          />
          <TextField
            required
            id='standard-name'
            label='phoneNumber'
            value={this.state.phoneNumber}
            onChange={this.handleChange}
            margin='normal'
            name='phoneNumber'
          />
          <TextField
            required
            id='standard-name'
            label='aboutMe'
            value={this.state.aboutMe}
            onChange={this.handleChange}
            margin='normal'
            name='aboutMe'
          />
          <TextField
            disabled
            id='standard-name'
            label='Account Type'
            value={this.props.type}
            margin='normal'
            name='userType'
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
    signUp: user => dispatch(signUp(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp); //!need first arg of null on connect if not using mapStateToProps
