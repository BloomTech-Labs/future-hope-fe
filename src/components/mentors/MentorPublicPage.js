import React from "react";
import Button from "@material-ui/core/Button";

import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBContainer
} from "mdbreact";
import "./mentors.css";

const MentorPublicPage = props => {
  const mentors = props.mentorData;
  console.log(mentors);

  return (
    <div className="mentor-cards">
      <MDBContainer className="mentor-card-mdcontainer">
        <MDBCard style={{ maxWidth: "22rem", margin: "40px" }} border="primary">
          <MDBCardImage
            className="img-fluid"
            src={mentors.photoUrl}
            alt="profile picture"
            waves
            style={{ width: "250px", height: "250px", borderRadius: "50%" }}
          />
          <MDBCardBody className="mentor-cards-body-section">
            <MDBCardTitle className="mentor-card-title">
              {mentors.name}
            </MDBCardTitle>
            <MDBCardText className="mentor-card-text">
              Location: {mentors.city}
            </MDBCardText>
            <MDBCardText className="mentor-card-text">
              About: {mentors.about}
            </MDBCardText>
            <MDBCardText className="mentor-card-text">
              Skills: {mentors.skills}
            </MDBCardText>
            <Button
              href="/login"
              size="small"
              color="primary"
              variant="contained"
            >
              Contact {mentors.name}
            </Button>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default MentorPublicPage;
