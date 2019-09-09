import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";
import SideBar from "../SideBar";
import Calendar from "../../calendar/Calendar.js";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import "../Dashboard.css";

class TeacherDashboard extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return (
        <Loader type="TailSpin" color="#e4be4d" height={100} width={100} />
      );
    }

    return (
      <div className="dashboardContainer">
        <MDBContainer>
          <MDBRow id="dashboard-MDBRow">
            <div className="row justify-content-start">
              <SideBar />
            </div>
            <MDBCol size="9">
              <Calendar />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(TeacherDashboard);
