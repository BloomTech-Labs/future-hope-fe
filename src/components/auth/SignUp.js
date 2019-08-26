import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { signUp, userStore } from "../../actions/auth.js";

import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { signInWithGoogle, signInWithFacebook, firestore, auth } from "../../config/fbConfig.js";

import "./SignUp.scss";

class SignUp extends React.Component {
  state = {
    // signingInWithOAuth is here so that we can conditionally render some of the ui elements
    // dependent on wether this user went directly to the signup page, or they were pushed here
    // from login
    signingInWithOAuth: false,
    showForm: false,
    fullName: "",
    email: "",
    // hey dumby. remember that this shouldnt be hard coded to mentor :D
    userType: "mentor",
    city: "",
    stateProvince: "",
    country: "",
    phoneNumber: "",
    aboutMe: "",
    password: ""
  };

  componentDidMount = () => {
    // if this user is being pushed here, and there is a user on props, then
    // we want to use the info that we already recieved, as well as set
    // signingInWithOAuth to true so that we can conditionally render some UI
    if (auth.currentUser) {
      const { email, displayName } = auth.currentUser;
      this.setState({
        email,
        fullName: displayName,
        signingInWithOAuth: true
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log("triggered");
    // user is creating a brand new account with email and password
    if (!this.state.signingInWithOAuth) {
      try {
        await auth.createUserWithEmailAndPassword(
          this.state.email,
          this.state.password
        );
      } catch (err) {
        alert(err.message);
        return;
        //! return something after the error so that it doesn't keep going
      }
    }
    const uid = auth.currentUser.uid;
    const userRef = firestore.collection("users").doc(uid);
    //* Create the user account
    await userRef.set({
      uid,
      email: this.state.email,
      fullName: this.state.fullName,
      photoUrl: auth.currentUser.photoURL || "",
      userType: this.state.userType,
      city: this.state.city,
      stateProvince: this.state.stateProvince,
      country: this.state.country,
      phoneNumber: this.state.phoneNumber,
      aboutMe: this.state.aboutMe,
      // all users MUST be approved before gaining full access
      awaitingApproval: true
    });
    alert("created your new account with a username and password!");
    // }

    // let uid = auth.currentUser.uid;
    // console.log("hi hey look here", uid);
    // get all of their info so we can set up a listener and route them
    // const userRef = firestore.collection("users").doc(uid);
    const userInfo = await userRef.get();
    // console.log(userInfo);
    // set up the listener on app.js
    // console.log("setting up user listener!", userInfo);
    this.props.setupUserListener(userInfo);
    // console.log("rerouting user", userInfo.data());
    const routeTo = this.props.routeUser(userInfo.data());
    this.props.history.push(routeTo);
    this.props.userStore(auth.currentUser); //!added this, stores user info into redux store after signup
  };

  render() {
    console.log("auth.currentUser", auth.currentUser);
    return (
      <div className='signup-wrapper'>
        {!this.state.signingInWithOAuth && (
          <Button
            variant='contained'
            color='secondary'
            onClick={async e => {
              await signInWithGoogle();
              console.log(auth.currentUser);
              this.setState({
                signingInWithOAuth: !this.state.signingInWithOAuth,
                fullName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                phoneNumber: auth.currentUser.phoneNumber || ""
              });
            }}
          >
            Sign Up With Google
          </Button>
        )}
        {!this.state.signingInWithOAuth && (
          <Button
            variant='contained'
            color='primary'
            onClick={async e => {
              await signInWithFacebook();
              console.log(auth.currentUser);
              this.setState({
                signingInWithOAuth: !this.state.signingInWithOAuth,
                fullName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                phoneNumber: auth.currentUser.phoneNumber || ""
              });
            }}
          >
            Sign Up With Facebook
          </Button>
        )}
        {!this.state.signingInWithOAuth && (
        <Button
          variant='contained'
          color='primary'
          onClick={() => this.setState({ showForm: !this.state.showForm })}
        >
          Sign Up With Email
        </Button>
        )}
        <div
          className={`signup-form-container ${
            this.state.signingInWithOAuth
              ? ""
              : this.state.showForm
              ? ""
              : "hidden"
          }`}
        >
          <form className='signup-form' onSubmit={this.handleSubmit}>
            <h5>Sign Up</h5>
            <TextField
              required
              disabled={this.state.signingInWithOAuth}
              id='standard-name'
              label='Name'
              value={this.state.fullName}
              onChange={this.handleChange}
              margin='normal'
              name='fullName'
            />
            <TextField
              required
              disabled={this.state.signingInWithOAuth}
              id='standard-email'
              label='Email'
              value={this.state.email}
              onChange={this.handleChange}
              margin='normal'
              name='email'
              type='email'
            />
            {!this.state.signingInWithOAuth && (
              <TextField
                required
                id='standard-email'
                label='Verify email'
                margin='normal'
                name='email'
                type='email'
              />
            )}
            {!this.state.signingInWithOAuth && (
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
            )}
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
              label='Phone Number'
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              margin='normal'
              name='phoneNumber'
            />
            <TextField
              required
              id='standard-name'
              label='About Me'
              value={this.state.aboutMe}
              onChange={this.handleChange}
              margin='normal'
              name='aboutMe'
            />
            <FormControl style={{ minWidth: 160 }}>
              <InputLabel htmlFor='age-simple'>Account Type</InputLabel>
              <Select
                value={this.state.userType}
                onChange={e => {
                  this.setState({
                    userType: e.target.value
                  });
                }}
              >
                <MenuItem value='mentor'>Mentor</MenuItem>
                <MenuItem value='teacher'>Teacher</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant='contained'
              size='large'
              color='primary'
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
          </form>
          <p>please note the following:</p>
          <ul>
            <li>a "mentor" is volunteer.</li>
            <li>a "teacher" is a classroom in need of assistance.</li>
          </ul>
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
    signUp: user => dispatch(signUp(user)),
    userStore: user => dispatch(userStore(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp); //!need first arg of null on connect if not using mapStateToProps
