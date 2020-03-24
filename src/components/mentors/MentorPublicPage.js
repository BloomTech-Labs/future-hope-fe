import React, { useEffect } from "react";
import { withRouter } from "react-router";
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBContainer
} from "mdbreact";
import "./mentors.css";

//analytics
import { logPageView } from "../Analytics";

const MentorPublicPage = props => {
  const mentors = props.mentorData;


  useEffect(() => {
    logPageView();
  }, []);

  const pushToLogin = () => {
    props.history.push(`/login`);
  };

  return (
    <div className="mentor-cards">
      <MDBContainer className="mentor-card-mdcontainer">
        <MDBCard style={{ maxWidth: "22rem", margin: "10px", padding: "30px" }}>
          <MDBCardImage
            className="img-fluid"
            src={
              mentors.photoUrl || "https://source.unsplash.com/random/800x800"
            }
            alt="profile picture"
            waves
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%"
            }}
          />
          <MDBCardBody className="mentor-cards-body-section">
            <MDBCardTitle className="mentor-card-title">
              {mentors.fullName}
            </MDBCardTitle>
            <MDBCardText className="mentor-card-text">
              Location: {mentors.city}
            </MDBCardText>
            <MDBBtn
              onClick={() => pushToLogin()}
              size="small"
              color="orange"
              variant="contained"
            >
              Contact
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default withRouter(MentorPublicPage);
