import React from "react"
import { connect } from "react-redux"
import { userStore } from "../../actions/auth.js"

//styles
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact"

import {
  signInWithGoogle,
  signInWithFacebook,
  firestore,
  auth
} from "../../config/fbConfig.js"

import "./SignUp.scss"

//analytics
import { logPageView, event } from "../Analytics"

class SignUp extends React.Component {
  state = {
    // signingInWithOAuth is here so that we can conditionally render some of the ui elements
    // dependent on wether this user went directly to the signup page, or they were pushed here
    // from login
    signingInWithOAuth: false,
    fullName: "",
    email: "",
    userType: "",
    city: "",
    stateProvince: "",
    country: "",
    phoneNumber: "",
    aboutMe: "",
    password: "",
    photoUrl:
      "https://firebasestorage.googleapis.com/v0/b/future-hope-school.appspot.com/o/users%2Fblank_user%2Fblank_user.png?alt=media&token=9a7ffce8-9fc6-40ef-9678-ad5cf6449eaa",
    completedTrainingProgress: [],
    validateSelect: "none"
  }



  componentDidMount = () => {
    logPageView()
    // if this user is being pushed here, and there is a user on props, then
    // we want to use the info that we already recieved, as well as set
    // signingInWithOAuth to true so that we can conditionally render some UI
    if (auth.currentUser) {
      const { email, displayName } = auth.currentUser
      this.setState({
        email,
        fullName: displayName,
        signingInWithOAuth: true
      })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleUserTypeChange = e => {
    this.setState({
      userType: e.target.value
    })
  }

  //signup with email
  handleSubmit = async e => {
    e.preventDefault()
    event("Email Signup", "User signedup in with Email", "SignUp")
    if (this.state.userType === "") {
      this.setState({ validateSelect: "flex" })
      console.log("User Type not selected")
    } else {
      // user is creating a brand new account with email and password
      if (!this.state.signingInWithOAuth) {
        try {
          await auth.createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
          )
        } catch (err) {
          alert(err.message)
          return
        }
      }

      const uid = auth.currentUser.uid
      const userRef = firestore.collection("users").doc(uid)
      // Create the user account
      // coming from auth.currentUser is info from Oauth
      await userRef.set({
        uid,
        email: this.state.email,
        fullName: this.state.fullName,
        photoUrl: auth.currentUser.photoURL || this.state.photoUrl,
        userType: this.state.userType,
        city: this.state.city,
        stateProvince: this.state.stateProvince,
        country: this.state.country,
        phoneNumber: this.state.phoneNumber,
        aboutMe: this.state.aboutMe,
        // all users MUST be approved before gaining full access
        awaitingApproval: true,
        completedTrainingProgress: this.state.completedTrainingProgress
      })
      alert("created your new account with a username and password!")

      const userInfo = await userRef.get()

      // set up the listener on app.js
      this.props.setupUserListener(userInfo)
      // pushing to the awaiting approval component since the default after signing up is to await approval.
      this.props.history.push("/applicationstatus")
      this.props.userStore(auth.currentUser) // stores user info into redux store after signup
    }
  }
  //oAuth signup with Google
  signUpWithGoogle = async e => {
    event("Google Signup", "User signedup in with Google", "SignUp")
    e.preventDefault()
    await signInWithGoogle()

    this.setState({
      signingInWithOAuth: !this.state.signingInWithOAuth,
      fullName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      phoneNumber: auth.currentUser.phoneNumber || ""
    })
  }

  //oAuth signup with Facebook
  signUpWithFacebook = async e => {
    event("Facebook Signup", "User signedup in with Facebook", "SignUp")
    e.preventDefault()
    await signInWithFacebook()

    this.setState({
      signingInWithOAuth: !this.state.signingInWithOAuth,
      fullName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      phoneNumber: auth.currentUser.phoneNumber || ""
    })
  }

  render() {
    return (
      <div className="signup-wrapper">
        <div>
          <MDBContainer>
            <MDBRow>
              <MDBCol>
                <MDBCard>
                  <MDBCardBody>
                    <form className="signup-form" onSubmit={this.handleSubmit}>
                      <p className="h4 text-center py-4">Sign Up</p>
                      <MDBInput
                        required
                        disabled={this.state.signingInWithOAuth}
                        id="standard-name"
                        label="Full Name"
                        icon="user"
                        value={this.state.fullName}
                        onChange={this.handleChange}
                        margin="normal"
                        name="fullName"
                      />
                      <MDBInput
                        required
                        disabled={this.state.signingInWithOAuth}
                        id="standard-email"
                        label="Enter Email"
                        icon="envelope"
                        value={this.state.email}
                        onChange={this.handleChange}
                        margin="normal"
                        name="email"
                        type="email"
                      />
                      {!this.state.signingInWithOAuth && (
                        <MDBInput
                          required
                          id="verify-email"
                          label="Verify Email"
                          icon="envelope"
                          margin="normal"
                          name="email"
                          type="email"
                        />
                      )}
                      {!this.state.signingInWithOAuth && (
                        <MDBInput
                          required
                          id="standard-password-input"
                          icon="lock"
                          type="password"
                          label="Create Password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          margin="normal"
                          name="password"
                        />
                      )}
                      <MDBInput
                        required
                        id="city"
                        label="City"
                        icon="map-signs"
                        value={this.state.city}
                        onChange={this.handleChange}
                        margin="normal"
                        name="city"
                      />
                      <MDBInput
                        required
                        id="state-province"
                        label="State or Province"
                        icon="map-marked-alt"
                        value={this.state.stateProvince}
                        onChange={this.handleChange}
                        margin="normal"
                        name="stateProvince"
                      />
                      <MDBInput
                        required
                        id="country"
                        label="Country"
                        icon="globe-africa"
                        value={this.state.country}
                        onChange={this.handleChange}
                        margin="normal"
                        name="country"
                      />
                      <MDBInput
                        required
                        id="phone"
                        label="Phone Number"
                        icon="phone"
                        value={this.state.phoneNumber}
                        onChange={this.handleChange}
                        margin="normal"
                        name="phoneNumber"
                      />
                      <MDBInput
                        required
                        id="about-me"
                        label="About Me"
                        icon="list-alt"
                        value={this.state.aboutMe}
                        onChange={this.handleChange}
                        margin="normal"
                        name="aboutMe"
                      />

                      <FormControl style={{ minWidth: 80 }} >
                        <InputLabel htmlFor="age-simple">
                          Choose an Account Type
                        </InputLabel>
                        {<p style={{ color: 'red', display: this.state.validateSelect }}>*Please select an account type.</p>}
                        <Select
                          required
                          name="selection"
                          value={this.state.userType}
                          onChange={e =>
                            //   {if(this.state.userType === ""){
                            //   this.state.validateSelect = false
                            // } else {
                            this.setState({
                              userType: e.target.value
                            })
                            // }}
                          }
                        >
                          <MenuItem value="mentor">
                            I am a Mentor in North America
                          </MenuItem>
                          <MenuItem value="teacher">
                            I am a Teacher in Ghana
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <div className="text-center mt-3">
                        <MDBBtn
                          id="sign-up-btn"
                          variant="contained"
                          color="orange"
                          type="submit"
                          onChange={e => {
                            if (this.state.userType === "") {
                              this.state.validateSelect = false
                            } else {
                              this.setState({
                                userType: e.target.value
                              })
                            }
                          }
                          }
                        >
                          Sign Up
                        </MDBBtn>
                      </div>
                    </form>
                    <div className="text-center mt-3">
                      <p className="h6 text-center">or Signup with:</p>
                      {!this.state.signingInWithOAuth && (
                        <MDBBtn
                          variant="contained"
                          color="blue"
                          onClick={async e => this.signUpWithFacebook(e)}
                        >
                          Facebook
                        </MDBBtn>
                      )}
                      <br />
                      {!this.state.signingInWithOAuth && (
                        <MDBBtn
                          variant="contained"
                          color="red"
                          onClick={e => this.signUpWithGoogle(e)}
                        >
                          Google
                        </MDBBtn>
                      )}
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userStore: user => dispatch(userStore(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
