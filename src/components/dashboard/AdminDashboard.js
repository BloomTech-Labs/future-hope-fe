import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
// import { firestoreConnect } from "react-redux-firebase";
// import { compose } from "redux";
//import { Redirect } from "react-router-dom";
import "./Dashboard.css";
import MentorTable from "./MentorTable.js";
import TeacherTable from "./TeacherTable.js";

class AdminDashboard extends Component {
  render() {
    const { auth, userInfo } = this.props;
    console.log("auth", auth);
    console.log("userinfo", userInfo);
    //if (!auth.uid) return <Redirect to="/" />;

    return (
      <div className="dashboardContainer">
        <MDBContainer>
          <MDBRow>
            <div className="row justify-content-start">
              <MDBCol size="3" className="dashboard-sidemenu">
                <div className="dashboard-admin-info">
                  <img src="#" alt="profile photo" />
                  <h1>Norman Green</h1>
                  <h3>Administrator</h3>
                </div>
                <div className="dashboard-sidemenu-btns">
                  <Button>View all Teachers</Button>
                  <Button>View all Mentors</Button>
                  <Button>Schedule a Meeting</Button>
                  <Button>Start a Conversation</Button>
                </div>
              </MDBCol>
            </div>
            <MDBCol size="9">
              <MentorTable />
              <TeacherTable />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    userInfo: state.firebase.profile //need access to the users collection to check userType and render props in the tables
  };
};

export default connect(mapStateToProps)(AdminDashboard);
//firestoreConnect([{ collection: "users" }]) (AdminDashboard);
