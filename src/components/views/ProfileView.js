import React from "react";
import { connect } from "react-redux";

const ProfileView = props => {
  return (
    <div>
      <p>Name: {props.userInfo.fullName}</p>
      <p>
        Location:{props.userInfo.city}, {props.userInfo.country}
      </p>

      <p>About me: {props.userInfo.aboutMe}</p>
      <p>Account Type: {props.userInfo.userType}</p>
    </div>
  );
};

//* This state.firebase.profile gives us all the profile info automatically stored into redux by firebase. Neat.
const mapStateToProps = state => {
  return {
    userInfo: state.firebase.profile
  };
};

export default connect(mapStateToProps)(ProfileView);
