import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { firestore } from "../../config/fbConfig.js";

class ViewUserProfile extends Component {
    state = {
        user: {}
    }
​
componentDidMount = async () => {
    let userProfileRef = firestore.collection("users").doc(req.params.id);
    let currentUser = await userProfileRef.get();
    console.log("current user", currentUser)
        
    this.setState({
        user: {
        ...currentUser.data()
      }
    });
    }
    
    render() {
      const {user} = this.state;

        return (
          <MDBContainer className="profile-container d-flex" fluid>
          <div className="w-25 pr-3">
            <img
              src={user.photoUrl}
              alt="profile"
              className="img-fluid rounded float-left z-depth-1-half"
            />
          </div>
          <div className="info-container">
            <h4 className="left-aligned font-weight-bold p-2">
              {user.fullName}
            </h4>
            <p className="left-aligned font-weight-light p-2">
              Location: {user.city}, {user.country}
            </p>
    
            <p className="left-aligned p-2">About me: {user.aboutMe}</p>
            <p className="left-aligned p-2">
              Account Type: {user.userType}
            </p>
            <Button size="small" color="primary" variant="contained">
              Contact {user.fullName}
            </Button>
          </div>
        </MDBContainer>
        )
    }
}

export default ViewUserProfile;