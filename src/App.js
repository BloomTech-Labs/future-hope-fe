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

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LandingPage} />
       
        <Route path = '/signup' component={SignUp} />
      </Switch>
    </Router>
  );
}

export default withRouter(App);


// <Route component={Page404} />