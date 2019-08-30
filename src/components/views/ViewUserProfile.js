import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { firestore } from "../../config/fbConfig.js";
// import Calendar from '../calendar/Calendar.js';

import { MDBContainer } from "mdbreact";

class ViewUserProfile extends React.Component {
  state = {
    profile_id: this.props.match.params.uid,
    profile_photoUrl: "",
    profile_fullName: "",
    profile_city: "",
    profile_stateProvince: "",
    profile_country: "",
    profile_aboutMe: "",
    profile_userType: ""
  };

  componentDidMount = async () => {
    //profile needs to render info based on the uid in the url
    //make a call to the firestore searching by the uid
    const userRef = firestore.collection("users").doc(this.state.profile_id);
    //using that info, make a get call and store that in userInfo
    const userInfo = await userRef.get();
    // console.log(userRef, 'userRef');
    // console.log(userInfo, 'userInfo');
    // console.log(userInfo.data(), '.data');
    //userInfo.data has all the info we want. store that in a variable for ease of use
    const profileInfo = userInfo.data(); //stores all the info we want from the db
    // console.log(profileInfo, 'profileInfo');

    //set state with the db info
    this.setState({
      profile_photoUrl: profileInfo.photoUrl,
      profile_fullName: profileInfo.fullName,
      profile_city: profileInfo.city,
      profile_stateProvince: profileInfo.stateProvince,
      profile_country: profileInfo.country,
      profile_aboutMe: profileInfo.aboutMe,
      profile_userType: profileInfo.userType
    });
  };
  render() {
    if (!this.props.userInfo.uid && this.props.userInfo.awitingApproval)
      return <Redirect to="/" />;
    return (
      <MDBContainer className="profile-container d-flex" fluid>
        <div className="w-25 pr-3">
          <img
            src={this.state.profile_photoUrl}
            alt="profile"
            className="img-fluid rounded float-left z-depth-1-half"
          />
          <Button
            href={
              this.props.userInfo.userType === "mentor"
                ? "/approved-teachers"
                : "/approved-mentors"
            }
          >
            {this.props.userInfo.userType === "mentor"
              ? "Teacher List"
              : "Mentor List"}
          </Button>
        </div>
        <div className="info-container">
          <h4 className="left-aligned font-weight-bold p-2">
            {this.state.profile_fullName}
          </h4>
          <p className="left-aligned font-weight-light p-2">
            Location: {this.state.profile_city},{" "}
            {this.state.profile_stateProvince}, {this.state.profile_country}
          </p>

          <p className="left-aligned p-2">
            About me: {this.state.profile_aboutMe}
          </p>
          <p className="left-aligned p-2">
            Account Type: {this.state.profile_userType}
          </p>
          <Button size="small" color="primary" variant="contained">
            Contact {this.state.profile_fullName}
          </Button>
        </div>
        {/* <Calendar /> */}
      </MDBContainer>
    );
  }
}

//* This state.firebase.profile gives us all the profile info automatically stored into redux by firebase. Neat.
const mapStateToProps = state => {
  return {
    userInfo: state.firebase.profile
  };
};

export default connect(mapStateToProps)(ViewUserProfile);
