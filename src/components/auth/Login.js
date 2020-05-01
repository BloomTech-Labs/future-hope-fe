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
  MDBCardBody,
} from "mdbreact";

import {
  signInWithGoogle,
  auth,
  firestore,
  signInWithFacebook,
} from "../../config/fbConfig.js";
import "../styles/auth_Login.scss";

//analytics
import { logPageView, event } from "../Analytics";

class Login extends React.Component {
  state = {
    user: {
      email: "",
      password: ""
    },
  };

  componentDidMount = () => {
    logPageView();
  };

  componentDidUpdate = () => {
    // OUR ROUTE WASNT RERENDERING, SO WE HAD TO FORCE IT TO
    // CHECK OUT APP.JS TO SEE WHAT IS GOING ON (LABS 15)

    if (this.props.rerouteUser) {
      this.props.history.push("/signup");
    }
  };

  handleChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  //Logs user in after firebase auth function authenticates user
  login = async () => {
    try {
      // get the now logged in users UID from the auth object
      let uid = auth.currentUser.uid;

      // Store the uid into localStorage as a work around for losing the currentUser on refresh
      localStorage.setItem("UID", JSON.stringify(uid));

      // get all of their info so we can set up a listener and route them
      const userRef = firestore.collection("users").doc(uid);

      const userInfo = await userRef.get();
      // set up the listener on app.js

      // reroutes a user who is awaiting approval to the awaitingapproval component.
      if (this.props.userInfo.usersAwaitingApproval) {
        this.props.history.push("/applicationstatus");
      } else {
        this.props.setupUserListener(userInfo);

        if (userInfo.data().userType) {
          this.props.history.push("/dashboard");
        } else {
          // stop google from auto logging in an unauthorized user, and push user to signup with prefilled info.
          localStorage.removeItem('UID')
          auth.signOut();
          this.props.history.push("/signup");
        }
      }
    } catch (err) {
      // handle error
    }
  }

  //login with Email
  handleSubmit = async (e) => {
    event("Email Login", "User logged in with Email", "Login");
    e.preventDefault();
    event("User-Login", "Form Submitted", "Login form");

    // try logging the user in.
    try {
      await auth.signInWithEmailAndPassword(
        this.state.user.email,
        this.state.user.password
      );
    } catch (err) {
      // this is to find out if the person loggin in has already made an account, or
      // if they just typed their email / pw wrong
      const ifUser = await firestore
        .collection("users")
        .where("email", "==", this.state.user.email)
        .get();
      // ifUser.docs.length is truthy (1), then the email exists, but they typed in in wrong. This means that the PW was wrong.
      if (ifUser.docs.length) {
        alert("Incorrect Email or Password");
        this.setState({
          ...this.state,
          error: "Incorrect Email Or Password"
        })
        console.log('Error Successful', this.state.error, err)
      } else {
        // email doesn't exist
        alert("Account does not exist, please signup");
        this.setState({
          ...this.state,
          error: "Account does not exist, please signup"
        })
        console.log('Error Successful', this.state.error, err)
      }
    }

    await this.login()

    // This calls the userStore action in order to store current user data in the redux store.
    this.props.userStore(auth.currentUser);
  };



  //oAuth login with Facebook btn
  loginWithFacebook = async () => {
    event("Facebook Login", "User logged in with Facebook", "Login");
    await signInWithFacebook();
    await this.login();
  };


  //oAuth login with Google btn
  loginWithGoogle = async () => {
    event("Google Login", "User logged in with Google", "Login");
    await signInWithGoogle();
    await this.login()
  };


  render() {
    return (
      <div className="login-container">
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={(e) => this.handleSubmit(e)}>
                    <p className="h4 text-center py-4">Please Login</p>

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

                    <div className="text-center mt-3">
                      <MDBBtn id="login-btn" color="orange" type="submit">
                        Login
                      </MDBBtn>
                    </div>
                  </form>
                  <div className="text-center mt-3">
                    <p className="h6 text-center">or Login with:</p>
                    <MDBBtn
                      variant="contained"
                      color="blue"
                      onClick={this.loginWithFacebook}
                    >
                      Facebook
                    </MDBBtn>
                    <br />
                    <MDBBtn
                      variant="contained"
                      color="red"
                      onClick={this.loginWithGoogle}
                    >
                      Google
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    userInfo: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userStore: (user) => dispatch(userStore(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
