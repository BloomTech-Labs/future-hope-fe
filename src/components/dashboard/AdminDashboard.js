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
    //if (!auth.uid) return <Redirect to="/" />;

    return (
      <div className="dashboardContainer">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="3" className="dashboard-sidemenu">
              <div>
                <img src="#" alt="profile photo" />
                <h1>Norman Green</h1>
                <h3>Administrator</h3>
              </div>
              <div className="dashboard-sidemenu-btns">
                <Button>View Teachers</Button>
                <Button>View Mentors</Button>
                <Button>Schedule Meeting</Button>
                <Button>Messaging</Button>
              </div>
            </MDBCol>
            <MDBCol md="9">
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
    userInfo: state.firebase.profile
  };
};

export default connect(mapStateToProps)(AdminDashboard);
//firestoreConnect([{ collection: "users" }]) (AdminDashboard);
