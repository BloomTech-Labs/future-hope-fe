import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Page404 from "./components/Page404";
import SignUp from "./components/auth/SignUp.js";
import Login from "./components/auth/Login";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route
          exact
          path='/signup/mentor'
          render={props => <SignUp type='Mentor' />}
        />
        <Route
          exact
          path='/signup/teacher'
          render={props => <SignUp type='Teacher' />}
        />
        <Route path='/login' component={Login} />
      </Switch>
    </Router>
  );
}

export default withRouter(App);

// <Route component={Page404} />
