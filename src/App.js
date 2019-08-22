import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { auth, firestore } from "./config/fbConfig.js";

import "firebase/auth";
import LandingPage from "./components/LandingPage";
import Page404 from "./components/Page404";
import SignUp from "./components/auth/SignUp.js";
import Login from "./components/auth/Login";

import "./App.css";

class App extends React.Component {
  unsubscribeFromAuth = null;

  state = {
    rerouteUser: false,
    user: null
  };

  componentDidMount = () => {
    this.unsubsribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        let userRef = firestore.collection("users").doc(uid);
        let isUser = await userRef.get();
        // console.log(isUser, "isUser");
        if (isUser.exists) {
          // console.log("user exists", isUser);
          // put the user into state!
          // check isUser.accountType
          // if isUser.accountType === "mentor"
          // history.push('mentorDashboard')
          // if isUser.accountType === "teacher"
          // history.push("teacherDashboard")
          //!  this.props.history.push() Awaiting initial component after login success
        } else {
          // create the baseline user entry and place it into the database
          await userRef.set({
            uid,
            email,
            fullName: displayName || "",
            photoURL: photoURL || ""
          });
          let userReturn = await userRef.get();
          // get it back, put it in state, and forward to the rest of the login
          this.setState({
            user: userReturn.data(),
            rerouteUser: true
          });
          // console.log(userReturn.data(), "user returned");
        }
      }
    });
  };
  componentWillUnmount = () => {
    this.unsubscribeFromAuth(); //clean up after yourself
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            exact
            path="/signup"
            render={props => <SignUp {...props} user={this.state.user} />}
          />
          <Route
            path="/login"
            render={props => (
              <Login {...props} rerouteUser={this.state.rerouteUser} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default withRouter(App);
