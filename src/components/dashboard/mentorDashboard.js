import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import MentorDashList from "./MentorDashList.js";
import { auth } from "firebase-admin";
import { Redirect } from "react-router-dom";


////  Add collections to the const {} object and mSTP when you know what they are....

class mentorDashboard extends Component {
  render() {
    const {} = this.props;
    if (!auth.uid) return <Redirect to="/" />;

    return (
      <div className="dashboardContainer">
        <p>Hello World</p>
        <MentorDashList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }])
)(mentorDashboard);
