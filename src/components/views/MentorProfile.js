import React from "react";

class MentorProfile extends React.Component {
  render() {
    const { auth, userInfo } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
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
              <h1>{userInfo.fullName}</h1>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    userInfo: state.firebase.profile
  };
};

export default connect(mapStateToProps)(MentorProfile);
