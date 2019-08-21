<<<<<<< HEAD
import React from 'react';
import LandingPage from './components/LandingPage/LandingPage'

function App() {
  return (
    <div className="App">
      <LandingPage/>
    </div>
=======
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/navbar/Navbar";
import Page404 from "./components/Page404";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route component={Page404} />
      </Switch>
    </Router>
>>>>>>> Staging
  );
}

export default withRouter(App);
