import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { signUp } from "../../actions/auth.js";

import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { signInWithGoogle, firestore, auth } from "../../config/fbConfig.js";
import { makeStyles } from "@material-ui/styles";

import "./SignUp.scss";

// const useStyles = makeStyles(theme => ({
//   button: {
//     margin: theme.spacing(1)
//   },
//   noRender: {
//     display: "none"
//   }
// }));

class SignUp extends React.Component {
  // classes = useStyles();

  state = {
    // wasRedirected is here so that we can conditionally render some of the ui elements
    // dependent on wether this user went directly to the signup page, or they were pushed here
    // from login
    wasRedirected: false,
    fullName: "",
    email: "",
    // hey dumby. remember that this shouldnt be hard coded to mentor :D
    userType: "mentor",
    city: "",
    stateProvince: "",
    country: "",
    phoneNumber: "",
    aboutMe: "",
    password: ""
  };

  componentDidMount = () => {
    // if this user is being pushed here, and there is a user on props, then
    // we want to use the info that we already recieved, as well as set
    // wasRedirected to true so that we can conditionally render some UI
    if (this.props.user) {
      const { email, fullName } = this.props.user;
      this.setState({
        email,
        fullName,
        wasRedirected: true
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    // this.props.signUp(this.state);
    // console.log("signing up your account!");

    if (this.state.wasRedirected) {
      // just need to update the users account with all credentials
      let userRef = firestore.collection("users").doc(this.props.user.uid);
      await userRef.set({
        uid: this.props.user.uid,
        email: this.state.email,
        fullName: this.state.fullName,
        photoUrl: this.props.photoURL || "",
        userType: this.state.userType,
        city: this.state.city,
        stateProvince: this.state.stateProvince,
        country: this.state.country,
        phoneNumber: this.state.phoneNumber,
        aboutMe: this.state.aboutMe,
        // all users MUST be approved before gaining full access
        usersAwaitingApproval: true
      });
      alert("User has been created after being redirected!");
    } else {
      // user is creating a brand new account with email and password
      await auth.createUserWithEmailAndPassword(
        this.state.email,
        this.state.password
      );
      const uid = auth.currentUser.uid;
      const userRef = firestore.collection("users").doc(uid);
      await userRef.set({
        // just retrieved the uid
        uid,
        email: this.state.email,
        fullName: this.state.fullName,
        photoUrl: auth.currentUser.photoURL || "",
        userType: this.state.userType,
        city: this.state.city,
        stateProvince: this.state.stateProvince,
        country: this.state.country,
        phoneNumber: this.state.phoneNumber,
        aboutMe: this.state.aboutMe,
        // all users MUST be approved before gaining full access
        usersAwaitingApproval: true
      });
      alert("created your new account with a username and password!");
    }
  };

  googleSignup = async e => {
    // people should only be clicking "sign up with google" if they werent redirected
    // get their google credentials
    await signInWithGoogle();
    // get the now created users uid
    let uid = auth.currentUser.uid;
    // create the user document and log the user in
    const userRef = firestore.collection("users").doc(uid);
    await userRef.set({
      // just retrieved the uid
      uid,
      email: this.state.email,
      fullName: this.state.fullName,
      photoUrl: auth.currentUser.photoURL || "",
      userType: this.state.userType,
      city: this.state.city,
      stateProvince: this.state.stateProvince,
      country: this.state.country,
      phoneNumber: this.state.phoneNumber,
      aboutMe: this.state.aboutMe,
      // all users MUST be approved before gaining full access
      usersAwaitingApproval: true
    });

    alert("created your new gmail user!");
  };

  render() {
    // console.log(this.props.user);
    return (
      <div className="signup-wrapper">
        <form className="signup-form" onSubmit={this.handleSubmit}>
          <h5>Sign Up</h5>
          <TextField
            required
            id="standard-name"
            label="Name"
            value={this.state.fullName}
            onChange={this.handleChange}
            margin="normal"
            name="fullName"
          />
          <TextField
            required
            id="standard-name"
            label="email"
            value={this.state.email}
            onChange={this.handleChange}
            margin="normal"
            name="email"
          />
          {!this.state.wasRedirected && (
            <TextField
              required
              className={`${this.state.wasRedirected ? "hidden" : ""}`}
              id="standard-password-input"
              type="password"
              label="Password"
              value={this.state.password}
              onChange={this.handleChange}
              margin="normal"
              name="password"
            />
          )}
          <TextField
            required
            id="standard-name"
            label="City"
            value={this.state.city}
            onChange={this.handleChange}
            margin="normal"
            name="city"
          />
          <TextField
            required
            id="standard-name"
            label="State or Province"
            value={this.state.stateProvince}
            onChange={this.handleChange}
            margin="normal"
            name="stateProvince"
          />
          <TextField
            required
            id="standard-name"
            label="Country"
            value={this.state.country}
            onChange={this.handleChange}
            margin="normal"
            name="country"
          />
          <TextField
            required
            id="standard-name"
            label="phoneNumber"
            value={this.state.phoneNumber}
            onChange={this.handleChange}
            margin="normal"
            name="phoneNumber"
          />
          <TextField
            required
            id="standard-name"
            label="aboutMe"
            value={this.state.aboutMe}
            onChange={this.handleChange}
            margin="normal"
            name="aboutMe"
          />
          <FormControl style={{ minWidth: 160 }}>
            <InputLabel htmlFor="age-simple">Age</InputLabel>
            <Select
              value={this.state.userType}
              onChange={e => {
                this.setState({
                  userType: e.target.value
                });
              }}
            >
              <MenuItem value="mentor">mentor</MenuItem>
              <MenuItem value="teacher">teacher</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.handleSubmit}
          >
            Sign Up
          </Button>
        </form>
        {!this.state.wasRedirected && (
          <Button
            variant="contained"
            color="secondary"
            onClick={this.googleSignup}
          >
            Sign Up With Google
          </Button>
        )}
        <p>please note the following:</p>
        <ul>
          <li>a "mentor" is volunteer.</li>
          <li>a "teacher" is a classroom in need of assistance.</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: user => dispatch(signUp(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp); //!need first arg of null on connect if not using mapStateToProps
