import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { userStore } from "../../actions/auth.js";

import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import {
  signInWithGoogle,
  signInWithFacebook,
  firestore,
  auth
} from "../../config/fbConfig.js";

import "./SignUp.scss";

//analytics
import { initGA, logPageView, event } from "../Analytics";

//! SAVE A DEFAULT IMAGE IF NONE IS PROVIDED

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
    password: "",
    photoUrl:
      "https://firebasestorage.googleapis.com/v0/b/future-hope-school.appspot.com/o/users%2Fblank_user%2Fblank_user.png?alt=media&token=9a7ffce8-9fc6-40ef-9678-ad5cf6449eaa"
  };

  componentDidMount = () => {
    initGA();
    logPageView();
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
    event("New-User-signup", "Form Submitted", "Sign up form");
    // console.log("triggered");
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
    //things coming from auth.currentUser is info from Oauth
    await userRef.set({
      uid,
      email: this.state.email,
      fullName: this.state.fullName,
      photoUrl: auth.currentUser.photoURL || this.state.photoUrl,
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
    //! pushing to the awaiting approval component since the default after signing up is to await approval.
    //! For test reasons, (if you want the redirect to take you to mentor_dashboard or teacher_dashboard, use routeTo)
    this.props.history.push("/applicationstatus");
    this.props.userStore(auth.currentUser); //!added this, stores user info into redux store after signup
  };

  render() {
    console.log("auth.currentUser", auth.currentUser);
    return (
      <div className="signup-wrapper">
        {!this.state.signingInWithOAuth && (
          <Button
            variant="contained"
            color="secondary"
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
            variant="contained"
            color="primary"
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
            variant="contained"
            color="primary"
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
          <form className="signup-form" onSubmit={this.handleSubmit}>
            <h5>Sign Up</h5>
            <TextField
              required
              disabled={this.state.signingInWithOAuth}
              id="standard-name"
              label="Name"
              value={this.state.fullName}
              onChange={this.handleChange}
              margin="normal"
              name="fullName"
            />
            <TextField
              required
              disabled={this.state.signingInWithOAuth}
              id="standard-email"
              label="Email"
              value={this.state.email}
              onChange={this.handleChange}
              margin="normal"
              name="email"
              type="email"
            />
            {!this.state.signingInWithOAuth && (
              <TextField
                required
                id="verify-email"
                label="Verify email"
                margin="normal"
                name="email"
                type="email"
              />
            )}
            {!this.state.signingInWithOAuth && (
              <TextField
                required
                id="standard-password-input"
                type="password"
                label="Password"
                value={this.state.password}
                onChange={this.handleChange}
                margin="normal"
                name="password"
              />
            )}
            <TextField
              required
              id="city"
              label="City"
              value={this.state.city}
              onChange={this.handleChange}
              margin="normal"
              name="city"
            />
            <TextField
              required
              id="state-province"
              label="State or Province"
              value={this.state.stateProvince}
              onChange={this.handleChange}
              margin="normal"
              name="stateProvince"
            />
            {/* //! Country and State probably need to be select menus like userType is  */}
            <TextField
              required
              id="country"
              label="Country"
              value={this.state.country}
              onChange={this.handleChange}
              margin="normal"
              name="country"
            />
            <TextField
              required
              id="phone"
              label="Phone Number"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              margin="normal"
              name="phoneNumber"
            />
            <TextField
              required
              id="about-me"
              label="About Me"
              value={this.state.aboutMe}
              onChange={this.handleChange}
              margin="normal"
              name="aboutMe"
            />
            <FormControl style={{ minWidth: 160 }}>
              <InputLabel htmlFor="age-simple">Account Type</InputLabel>
              <Select
                value={this.state.userType}
                onChange={e => {
                  this.setState({
                    userType: e.target.value
                  });
                }}
              >
                <MenuItem value="mentor">Mentor</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
              </Select>
            </FormControl>
            <Button
              id="sign-up-btn"
              variant="contained"
              size="large"
              color="primary"
              type="submit"
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
    // signUp: user => dispatch(signUp(user)), //! This action is no longer being used. Leaving it here just in case
    userStore: user => dispatch(userStore(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp); //!need first arg of null on connect if not using mapStateToProps
