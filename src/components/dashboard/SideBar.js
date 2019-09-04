import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./Dashboard.css";

class SideBar extends React.Component {
  state = {
    active: false
  };

  render() {
    return (
      <div className="dashboardContainer">
        <MDBContainer>
          <MDBRow id="dashboard-MDBRow">
            <div className="row justify-content-start">
              <MDBCol size="3" className="dashboard-sidemenu">
                <div className="sidebar-info">
                  <img src="#" alt="profile photo" />
                  <h1>{this.props.userInfo.fullName}</h1>
                  <h3>{this.props.userInfo.userType}</h3>
                </div>
                <div className="dashboard-sidemenu-btns">
                  <Button href="#">Schedule a Meeting</Button>
                  <Button
                    onClick={() =>
                      this.props.userInfo.userType === "mentor"
                        ? this.props.history.push("/approved-teachers")
                        : this.props.history.push("/approved-mentors")
                    }
                  >
                    View{" "}
                    {this.props.userInfo.userType === "mentor"
                      ? "Teachers"
                      : "Mentors"}
                  </Button>
                  <Button href="#">Start a Conversation</Button>
                </div>
              </MDBCol>
            </div>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.firebase.profile
  };
};

export default withRouter(connect(mapStateToProps)(SideBar));

// <Button href="/approved-mentors">
// View approved Mentors
// </Button>
