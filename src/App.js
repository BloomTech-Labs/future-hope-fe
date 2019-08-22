import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/navbar/Navbar";
//import Page404 from "./components/Page404";
import MentorList from "./components/mentors/MentorList";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        {/* <Route component={Page404} /> */}
        <Route path="/mentors" component={MentorList} />
      </Switch>
    </>
  );
}

export default withRouter(App);
