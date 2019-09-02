import React, { Component } from "react";
import { connect } from "react-redux";
// import { firestoreConnect } from "react-redux-firebase";
// import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";

import MentorDashList from "./MentorDashList.js";
import Calendar from "../calendar/Calendar.js";

////  Add collections to the const {} object and mSTP when you know what they are....

class mentorDashboard extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return (
        //! Joel removed the redirect due to a race condition problem on refreshes. We will need another way to redirect, or at least delay the check first
        <Loader type='TailSpin' color='#e4be4d' height={100} width={100} />
      );
    }

    return (
      <div className='dashboardContainer'>
        <p>Hello World</p>
        <Calendar />
        {/* //! Commenting out for calendar render to test. Potentially for releast 1 meeting Tuesday */}
        {/* <MentorDashList /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

//! Commenting out code, thid doesn't work with our firebase implementation
// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect([{ collection: "users" }])
// )(mentorDashboard);

export default connect(mapStateToProps)(mentorDashboard);
