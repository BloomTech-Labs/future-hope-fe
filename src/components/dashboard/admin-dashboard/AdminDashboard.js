import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { firestore } from "../../../config/fbConfig.js";
import MentorTable from "./MentorTable.js";
import TeacherTable from "./TeacherTable.js";
import ApprovedMentorList from "../ApprovedMentorList.js";
import SideBar from "../SideBar";
// import { QuerySnapshot } from "@google-cloud/firestore";

import "../Dashboard.css";

class AdminDashboard extends Component {
  state = {
    users: [],
    userType: ""
  };

  componentDidMount = async () => {
    let userArray = [];
    const userRef = firestore.collection("users");
    const userList = await userRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // console.log(doc.data());
        userArray.push({
          approval: doc.data().awaitingApproval,
          name: doc.data().fullName,
          userType: doc.data().userType,
          city: doc.data().city,
          stateProvince: doc.data().stateProvince,
          uid: doc.data().uid
        });
      });
    });
    this.setState({
      users: userArray
    });
    //! This is the fix for the refreshing as an admin and not being able to get back to this component.
    //! This also fixes accounts that are not admins being able to access the admin-dash
    //! Only problem is, when you are a non-admin account and attempt access, it flashes the admin dash before redirecting.
    setTimeout(() => {
      if (this.props.userInfo.userType !== "admin") {
        this.props.history.push("/");
      }
    }, 0);
  };
  render() {
    // const { auth, userInfo } = this.props;
    // console.log("auth", auth);
    // console.log("userinfo", userInfo);

    return (
      <div className="dashboardContainer">
        <MDBContainer>
          <MDBRow id="dashboard-MDBRow">
            <div className="row justify-content-start">
              <MDBCol size="3" className="dashboard-sidemenu">
                <div className="sidebar-info">
                  <img src="#" alt="profile photo" />
                  <h1>Norman Hill</h1>
                  <h3>Administrator</h3>
                </div>
                <div className="dashboard-sidemenu-btns">
                  <Button href="#">Schedule a Meeting</Button>
                  <Button
                    onClick={() =>
                      this.props.history.push("/approved-teachers")
                    }
                  >
                    View Approved Teachers
                  </Button>
                  <Button
                    onClick={() => this.props.history.push("/approved-mentors")}
                  >
                    View Approved Mentors
                  </Button>
                  <Button href="#">Start a Conversation</Button>
                </div>
              </MDBCol>
            </div>
            <MDBCol size="9">
              <MentorTable
                users={this.state.users}
                history={this.props.history}
              />
              <TeacherTable
                users={this.state.users}
                history={this.props.history}
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    userInfo: state.firebase.profile //need access to the users collection instead to check userType and render props in the tables
  };
};
export default connect(mapStateToProps)(AdminDashboard);
