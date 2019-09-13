import React, { useState, useEffect } from "react";
import { firestore, auth } from "../../config/fbConfig.js";
import { connect } from "react-redux";

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
  render() {
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.updateInfo();
          }}
        >
          <input
            type="text"
            name="fullName"
            value={this.state.fullName}
            onChange={this.handleChanges}
          ></input>
          <input
            type="text"
            name="stateProvince"
            value={this.state.stateProvince}
            onChange={this.handleChanges}
          ></input>
          <input
            type="text"
            name="city"
            value={this.state.city}
            onChange={this.handleChanges}
          ></input>
          <input
            type="text"
            name="aboutMe"
            value={this.state.aboutMe}
            onChange={this.handleChanges}
          ></input>
          <input
            type="text"
            name="country"
            value={this.state.country}
            onChange={this.handleChanges}
          ></input>
          <input
            type="text"
            name="phoneNumber"
            value={this.state.phoneNumber}
            onChange={this.handleChanges}
          ></input>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChanges}
          ></input>
          <button
            onSubmit={e => {
              e.preventDefault();
              this.updateInfo();
            }}
          >
            Save Changes
          </button>
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

/*


 // let fillName = await props.userInfo.fullName;
  // console.log(fillName);
 

  const [name, setName] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [city, setCity] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const updateInfo = async () => {
    const uid = props.userInfo.uid;
    const userRef = firestore.collection("users").doc(uid);
    await userRef.set({
      email: email,
      fullName: name,
      city: city,
      stateProvince: stateProvince,
      country: country,
      phoneNumber: phoneNumber,
      aboutMe: aboutMe
    });
  };

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          updateInfo();
        }}
      >
        <input
          type="text"
          target="name"
          value={name}
          onChange={e => setName(e.target.value)}
        >
          
        </input>
        <input
          type="text"
          target="stateProvince"
          value={stateProvince}
          onChange={e => setStateProvince(e.target.value)}
        >
       
        </input>
        <input
          type="text"
          target="city"
          value={city}
          onChange={e => setCity(e.target.value)}
        >
          
        </input>
        <input
          type="text"
          target="aboutMe"
          value={aboutMe}
          onChange={e => setAboutMe(e.target.value)}
        >
          
        </input>
        <input
          type="text"
          target="country"
          value={country}
          onChange={e => setCountry(e.target.value)}
        >
         
        </input>
        <input
          type="text"
          target="phoneNumber"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        >
         
        </input>
        <input
          type="text"
          target="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        >
          
        </input>
        <button
          onSubmit={e => {
            e.preventDefault();
            updateInfo();
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );



*/
