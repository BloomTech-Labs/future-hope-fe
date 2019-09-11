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
      <div id="dashboardContainer">
        <MDBContainer>
          <MDBRow id="dashboard-MDBRow">
            <div id="dashboard-row" className=" row justify-content-start">
              <MDBCol size="3" className="dashboard-sidemenu">
                <div className="dashboard-sidemenu-btns">
                  <Button id="dashboard-btns" href="#">
                    Schedule a Meeting
                  </Button>
                  <Button
                    id="dashboard-btns"
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
                  <Button id="dashboard-btns">Start a Conversation</Button>
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
