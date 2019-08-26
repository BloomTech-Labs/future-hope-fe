import React, { Component } from "react";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import MentorDashList from './MentorDashList.js';

class mentorDashboard extends Component {
  render() {
      const {}
    return (
      <div className="dashboardContainer">
        <p>Hello World</p>
        <MentorDashList />
      </div>
    );
  }
}

export default mentorDashboard;
