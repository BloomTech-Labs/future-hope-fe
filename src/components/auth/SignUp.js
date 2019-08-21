import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { signUp } from "../../actions/auth.js";
import Button from "@material-ui/core/Button";
import { signInWithGoogle, firestore } from "../../config/fbConfig.js";

class SignUp extends React.Component {
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  googleSignup = async e => {
    if (this.props.user) {
      let userRef = firestore.collection("users").doc(this.props.user.uid);
      await userRef.set({
        uid: this.props.user.uid,
        email: this.props.user.email,
        fullName: this.props.displayName,
        photoUrl: this.props.photoURL
      });
      //!  this.props.history.push() Awaiting initial component after login success
    } else {
      await signInWithGoogle();
      // let userRef = firestore.collection('users').doc(this.props.user.uid)
      // let isUser = await userRef.get()
      // let userRef = firestore.collection('usersAwaitingApproval').doc(this.props.user.uid)
      // console.log('isUser inside Signup', isUser)
      // if (isUser.exists) {
      //   console.log('user exists', isUser);
      // }
    }
  };

  render() {
    console.log(this.props.user);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h5>Sign Up as {this.props.type}</h5>
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
          <TextField
            required
            id="standard-password-input"
            type="password"
            label="Password"
            value={this.state.password}
            onChange={this.handleChange}
            margin="normal"
            name="password"
          />
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
          <TextField
            disabled
            id="standard-name"
            label="Account Type"
            value={this.props.type}
            margin="normal"
            name="userType"
          />
          <Button
            variant="outlined"
            size="large"
            color="primary"
            onClick={this.handleSubmit}
          >
            Sign Up
          </Button>
        </form>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.googleSignup}
        >
          Sign Up With Google
        </Button>
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
