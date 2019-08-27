import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

//  My zoom is sucking

class AdminDashboard extends Component {
  render() {
    const { auth } = this.props;
    // if (!auth.uid) return <Redirect to="/" />;

    return (
      <div className="dashboardContainer">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="3">
              <p>Hello World</p>
            </MDBCol>
            <MDBCol md="9">
              <p>Hello World</p>
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

export default 
  connect(mapStateToProps)
(AdminDashboard);

// export default AdminDashboard;
