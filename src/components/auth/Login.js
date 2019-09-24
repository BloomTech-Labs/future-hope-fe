import React from "react";
import { connect } from "react-redux";
import { userStore } from "../../actions/auth.js";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";

import {
  signInWithGoogle,
  auth,
  firestore,
  signInWithFacebook
} from "../../config/fbConfig.js";
import "./Login.scss";

//analytics
import { logPageView, event } from "../Analytics";

class Login extends React.Component {
  state = {
    user: {
      email: "",
      password: ""
    },
    loginWithEmail: false
  };

  componentDidMount = () => {
    logPageView();
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
    event("User-Login", "Form Submitted", "Login form");
    // this.props.login(this.state.user);
    try {
      // try logging the user in.
      await auth.signInWithEmailAndPassword(
        this.state.user.email,
        this.state.user.password
      );
      // get the now logged in users UID from the auth object
      let uid = auth.currentUser.uid;

      // Store the uid into localStorage as a work around for losing the currentUser on refresh
      localStorage.setItem("UID", JSON.stringify(uid));

      // get all of their info so we can set up a listener and route them
      const userRef = firestore.collection("users").doc(uid);
      // console.log("userRef", userRef);
      const userInfo = await userRef.get();
      // set up the listener on app.js
      // console.log("setting up user listener!", userInfo);
      //* This reroutes a user who is awaiting approval to the awaitingapproval component.
      if (this.props.userInfo.awaitingApproval) {
        this.props.history.push("/applicationstatus");
      } else {
        this.props.setupUserListener(userInfo);
        // console.log("rerouting user", userInfo.data());
        // const routeTo = this.props.routeUser(userInfo.data());
        // console.log("userInfo", userInfo);
        // console.log("auth.currentUser", auth.currentUser);
        this.props.history.push("/dashboard");
      }
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
    }
    //* This calls the userStore action in order to store current user data in the redux store.
    this.props.userStore(auth.currentUser);
  };

  toggleEmailLogin = e => {
    e.preventDefault();
    this.setState({
      loginWithEmail: !this.state.loginWithEmail
    });
  };

  render() {
    return (
      <div className="login-container">
        <MDBBtn
          variant="contained"
          color="secondary"
          onClick={async () => {
            try {
              await signInWithFacebook();
              // get the now logged in users UID from the auth object
              let uid = auth.currentUser.uid;

              // Store the uid into localStorage as a work around for losing the currentUser on refresh
              localStorage.setItem("UID", JSON.stringify(uid));

              // get all of their info so we can set up a listener and route them
              const userRef = firestore.collection("users").doc(uid);
              console.log(userRef);
              const userInfo = await userRef.get();
              // set up the listener on app.js
              // console.log(this.props.userInfo, 'userInfo');
              //* This reroutes a user who is awaiting approval to the awaitingapproval component.
              if (this.props.userInfo.usersAwaitingApproval) {
                this.props.history.push("/applicationstatus");
              } else {
                this.props.setupUserListener(userInfo);
                console.log("rerouting user", userInfo.data());
                if (userInfo.data().userType) {
                  const routeTo = this.props.routeUser(userInfo.data());
                  this.props.userStore(auth.currentUser);
                  this.props.history.push(routeTo);
                } else {
                  this.props.history.push("/signup");
                }
              }
            } catch (err) {
              // handel error
            }
          }}
        >
          Login with Facebook
        </MDBBtn>
        <MDBBtn
          variant="contained"
          color="red"
          onClick={async () => {
            try {
              await signInWithGoogle();

              // get the now logged in users UID from the auth object
              let uid = auth.currentUser.uid;

              // Store the uid into localStorage as a work around for losing the currentUser on refresh
              localStorage.setItem("UID", JSON.stringify(uid));

              // get all of their info so we can set up a listener and route them
              const userRef = firestore.collection("users").doc(uid);
              console.log(userRef);
              const userInfo = await userRef.get();
              console.log(this.props.userInfo, "userInfo from google");
              //* This reroutes a user who is awaiting approval to the awaitingapproval component.
              //! This one is named awaitingApproval, not usersAwaitingApproval for some reason.
              if (this.props.userInfo.awaitingApproval) {
                this.props.history.push("/applicationstatus");
              } else {
                // set up the listener on app.js
                this.props.setupUserListener(userInfo);
                console.log("rerouting user", userInfo.data());
                if (userInfo.data().userType) {
                  const routeTo = this.props.routeUser(userInfo.data());
                  this.props.userStore(auth.currentUser);
                  this.props.history.push(routeTo);
                } else {
                  this.props.history.push("/signup");
                }
              }
            } catch (err) {
              // handel error
            }
          }}
        >
          Login with Google
        </MDBBtn>
        {/* //! Button needs to be added to Navbar */}
        <MDBBtn
          variant="contained"
          color="primary"
          onClick={e => this.toggleEmailLogin(e)}
        >
          Login with Email
        </MDBBtn>
        <div
          className={`email-login-container ${
            this.state.loginWithEmail ? "" : "hidden"
          }`}
        >
          <MDBContainer>
            <MDBRow>
              <MDBCol>
                <MDBCard>
                  <MDBCardBody>
                    <form>
                      <p className="h4 text-center py-4">Please Login</p>
                      <div className="grey-text">
                        <MDBInput
                          id="email"
                          label="Your email"
                          icon="envelope"
                          group
                          type="email"
                          validate
                          error="wrong"
                          success="right"
                          name="email"
                          value={this.state.user.email}
                          onChange={this.handleChange}
                        />
                        <MDBInput
                          id="password"
                          label="Your password"
                          icon="lock"
                          group
                          type="password"
                          validate
                          name="password"
                          value={this.state.user.password}
                          onChange={this.handleChange}
                        />

                        <div className="text-center py-4 mt-3">
                          <MDBBtn
                            id="login-btn"
                            color="cyan"
                            type="submit"
                            onClick={e => this.handleSubmit(e)}
                          >
                            Login
                          </MDBBtn>
                        </div>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    userInfo: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // login: creds => dispatch(login(creds)), //! Not being used. Leaving here just in case, again.
    userStore: user => dispatch(userStore(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
