import React from "react";
import { firestore } from "../../config/fbConfig.js";
import { connect } from "react-redux";

import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import UploadPhoto from "./UploadPhoto";

import "./Profile.scss";

class EditProfileView extends React.Component {
  state = {
    fullName: "",
    email: "",
    city: "",
    stateProvince: "",
    country: "",
    phoneNumber: "",
    aboutMe: ""
  };

  componentWillReceiveProps = () => {
    this.setState({
      fullName: this.props.userInfo.fullName,
      email: this.props.userInfo.email,
      city: this.props.userInfo.city,
      stateProvince: this.props.userInfo.stateProvince,
      country: this.props.userInfo.country,
      phoneNumber: this.props.userInfo.phoneNumber,
      aboutMe: this.props.userInfo.aboutMe
    });
  };

  handleChanges = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  updateInfo = async () => {
    const uid = this.props.userInfo.uid;
    const userRef = firestore.collection("users").doc(uid);
    await userRef.set({
      email: this.state.email,
      fullName: this.state.fullName,
      city: this.state.city,
      stateProvince: this.state.stateProvince,
      country: this.state.country,
      phoneNumber: this.state.phoneNumber,
      aboutMe: this.state.aboutMe
    });
  };
  uploadImage = e => {};

  render() {
    return (
      <div className="view-profile-wrapper">
        <form
          className="profile-form"
          onSubmit={e => {
            e.preventDefault();
            this.updateInfo();
          }}
        >
          <Input
            className="profile-input"
            type="text"
            name="fullName"
            value={this.state.fullName}
            onChange={this.handleChanges}
          ></Input>
          <Input
            className="profile-input"
            type="text"
            name="stateProvince"
            value={this.state.stateProvince}
            onChange={this.handleChanges}
          ></Input>
          <Input
            className="profile-input"
            type="text"
            name="city"
            value={this.state.city}
            onChange={this.handleChanges}
          ></Input>
          <Input
            className="profile-input"
            type="text"
            name="aboutMe"
            value={this.state.aboutMe}
            onChange={this.handleChanges}
          ></Input>
          <Input
            className="profile-input"
            type="text"
            name="country"
            value={this.state.country}
            onChange={this.handleChanges}
          ></Input>
          <Input
            className="profile-input"
            type="text"
            name="phoneNumber"
            value={this.state.phoneNumber}
            onChange={this.handleChanges}
          ></Input>
          <Input
            className="profile-input"
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChanges}
          ></Input>
          <Button
            className="profile-button-save"
            onSubmit={e => {
              e.preventDefault();
              this.uploadImage();
            }}
          >
            Profile Pic
          </Button>
          <Button
            className="profile-button-save"
            onSubmit={e => {
              e.preventDefault();
              this.updateInfo();
            }}
          >
            Save Changes
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.firebase.profile
  };
};

export default connect(mapStateToProps)(EditProfileView);
