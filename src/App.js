import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/navbar/Navbar";
import Page404 from "./components/Page404";
import MentorPublicPage from "./components/mentors/MentorPublicPage";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route component={Page404} />
        <Route path="/mentors" component={MentorPublicPage} />
      </Switch>
    </>
  );
}

export default withRouter(App);
