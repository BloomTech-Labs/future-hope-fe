import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { firestore } from "../../config/fbConfig.js";
//import { Redirect } from "react-router-dom";
import "./Dashboard.css";
import MentorTable from "./MentorTable.js";
import TeacherTable from "./TeacherTable.js";
import ApprovedMentorList from "./ApprovedMentorList.js";
// import { QuerySnapshot } from "@google-cloud/firestore";
import { Redirect } from "react-router-dom";

class AdminDashboard extends Component {
  state = {
    users: []
  };

  componentDidMount = async () => {
    let userArray = [];
    const userRef = firestore.collection("users");
    const userList = await userRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data());
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
    console.log("userArray", userArray);
  };

  render() {
    const { auth, userInfo } = this.props;

    console.log("auth", auth);
    console.log("userinfo", userInfo);

    //if (!auth.uid) return <Redirect to="/" />;
    // if(this.props.userInfo.userType !== "admin") return <Redirect to = '/' /> //* just redirect to landing page?

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
                  <Button href="/approved-teachers">
                    View approved Teachers
                  </Button>

                  <Button href="/approved-mentors">
                    View approved Mentors
                  </Button>

                  <Button href="#">Schedule a Meeting</Button>
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
  console.log(state);
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    userInfo: state.firebase.profile //need access to the users collection instead to check userType and render props in the tables
  };
};

export default connect(mapStateToProps)(AdminDashboard);
