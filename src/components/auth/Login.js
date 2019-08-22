import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { login } from "../../actions/auth.js";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import {
  signInWithGoogle,
  auth,
  firestore,
  signInWithFacebook
} from "../../config/fbConfig.js";
import "./Login.scss";

const FacebookButton = withStyles({
  root: {
    background: "#3b5998",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    "&:hover": {
      backgroundColor: "#8b9dc3"
    }
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);

class Login extends React.Component {
  state = {
    user: {
      email: "",
      password: ""
    },
    loginWithEmail: false
  };

  componentDidUpdate = () => {
    // HEY FUTURE PERSON WHO DOSNT UNDERSTAND WHAT THE HELL IS GOING ON!@#!@#!
    // OUR ROUTE WASNT RERENDERING, SO WE HAD TO FORCE IT TO :D
    // CHECK OUT APP.JS TO SEE WHAT THE HECK IS GOING ON :D

    // console.log("updating??", this.props.rerouteUser);
    if (this.props.rerouteUser) {
      this.props.history.push("/signup");
    }
  };

  handleChange = e => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    // this.props.login(this.state.user);
    try {
      // try logging the user in.
      await auth.signInWithEmailAndPassword(
        this.state.user.email,
        this.state.user.password
      );
      // get the now logged in users UID from the auth object
      let uid = auth.currentUser.uid;
      // get all of their info so we can set up a listener and route them
      const userRef = firestore.collection("users").doc(uid);
      const userInfo = await userRef.get();
      // set up the listener on app.js
      // console.log("setting up user listener!", userInfo);
      this.props.setupUserListener(userInfo);
      // console.log("rerouting user", userInfo.data());
      const routeTo = this.props.routeUser(userInfo.data());
      this.props.history.push(routeTo);
      // alert("user logged in!");
    } catch (err) {
      //this is to find out if the person loggin in has already made an account, or
      //if they just typed their email / pw wrong
      const ifUser = await firestore
        .collection("users")
        .where("email", "==", this.state.user.email)
        .get();
      //ifUser.docs.length is truthy (1), then the email exists, but they typed in in wrong. This means that the PW was wrong.
      if (ifUser.docs.length) {
        alert("Incorrect Email or Password");
      } else {
        //email doesn't exist, so sign it up dummy
        alert("Account does not exist, please signup");
      }
      // console.log("hey, heres the error you need to look at!", err);
      // await auth.createUserWithEmailAndPassword(
      //   this.state.user.email,
      //   this.state.user.password
      // );
      alert("Please go to signup page!");
    }
    // console.log(loggedInUser);
  };

  toggleEmailLogin = e => {
    e.preventDefault();
    this.setState({
      loginWithEmail: !this.state.loginWithEmail
    });
  };

  render() {
    return (
      <div className='login-container'>
        {/* <FacebookButton
          variant="contained"
          color="secondary"
          onClick={signInWithFacebook}
        >
          Login with Facebook
        </FacebookButton> */}
        <Button
          variant='contained'
          color='secondary'
          onClick={async () => {
            try {
              await signInWithGoogle();

              // get the now logged in users UID from the auth object
              let uid = auth.currentUser.uid;
              // get all of their info so we can set up a listener and route them
              const userRef = firestore.collection("users").doc(uid);
              const userInfo = await userRef.get();
              // set up the listener on app.js
              // console.log("setting up user listener!", userInfo);
              this.props.setupUserListener(userInfo);
              // console.log("rerouting user", userInfo.data());
              const routeTo = this.props.routeUser(userInfo.data());
              this.props.history.push(routeTo);
            } catch (err) {
              // handel error
            }
          }}
        >
          Login with Google
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => auth.signOut()}
        >
          signout
        </Button>{" "}
        {/* //! Button needs to be added to Navbar */}
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
