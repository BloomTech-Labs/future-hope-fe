import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { signUp, userStore } from "../../actions/auth.js";

import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { signInWithGoogle, firestore, auth } from "../../config/fbConfig.js";

import "./SignUp.scss";

const countries = [
  { label: "Afghanistan" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "American Samoa" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Anguilla" },
  { label: "Antarctica" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Aruba" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bermuda" },
  { label: "Bhutan" },
  { label: "Bolivia" },
  { label: "Bosnia and Herzegowina" },
  { label: "Botswana" },
  { label: "Bouvet Island" },
  { label: "Brazil" },
  { label: "British Indian Ocean Territory" },
  { label: "Brunei Darussalam" },
  { label: "Bulgaria" },
  { label: "Burkina Faso" },
  { label: "Burundi" },
  { label: "Cambodia" },
  { label: "Cameroon" },
  { label: "Canada" },
  { label: "Cape Verde" },
  { label: "Cayman Islands" },
  { label: "Central African Republic" },
  { label: "Chad" },
  { label: "Chile" },
  { label: "China" },
  { label: "Christmas Island" },
  { label: "Cocos (Keeling) Islands" },
  { label: "Colombia" },
  { label: "Comoros" },
  { label: "Congo" },
  { label: "Congo, the Democratic Republic of the" },
  { label: "Cook Islands" },
  { label: "Costa Rica" },
  { label: "Cote d'Ivoire" },
  { label: "Croatia (Hrvatska)" },
  { label: "Cuba" },
  { label: "Cyprus" },
  { label: "Czech Republic" },
  { label: "Denmark" },
  { label: "Djibouti" },
  { label: "Dominica" },
  { label: "Dominican Republic" },
  { label: "East Timor" },
  { label: "Ecuador" },
  { label: "Egypt" },
  { label: "El Salvador" },
  { label: "Equatorial Guinea" },
  { label: "Eritrea" },
  { label: "Estonia" },
  { label: "Ethiopia" },
  { label: "Falkland Islands (Malvinas)" },
  { label: "Faroe Islands" },
  { label: "Fiji" },
  { label: "Finland" },
  { label: "France" },
  { label: "France Metropolitan" },
  { label: "French Guiana" },
  { label: "French Polynesia" },
  { label: "French Southern Territories" },
  { label: "Gabon" },
  { label: "Gambia" },
  { label: "Georgia" },
  { label: "Germany" },
  { label: "Ghana" },
  { label: "Gibraltar" },
  { label: "Greece" },
  { label: "Greenland" },
  { label: "Grenada" },
  { label: "Guadeloupe" },
  { label: "Guam" },
  { label: "Guatemala" },
  { label: "Guinea" },
  { label: "Guinea-Bissau" },
  { label: "Guyana" },
  { label: "Haiti" },
  { label: "Heard and Mc Donald Islands" },
  { label: "Holy See (Vatican City State)" },
  { label: "Honduras" },
  { label: "Hong Kong" },
  { label: "Hungary" },
  { label: "Iceland" },
  { label: "India" },
  { label: "Indonesia" },
  { label: "Iran (Islamic Republic of)" },
  { label: "Iraq" },
  { label: "Ireland" },
  { label: "Israel" },
  { label: "Italy" },
  { label: "Jamaica" },
  { label: "Japan" },
  { label: "Jordan" },
  { label: "Kazakhstan" },
  { label: "Kenya" },
  { label: "Kiribati" },
  { label: "Korea, Democratic People's Republic of" },
  { label: "Korea, Republic of" },
  { label: "Kuwait" },
  { label: "Kyrgyzstan" },
  { label: "Lao, People's Democratic Republic" },
  { label: "Latvia" },
  { label: "Lebanon" },
  { label: "Lesotho" },
  { label: "Liberia" },
  { label: "Libyan Arab Jamahiriya" },
  { label: "Liechtenstein" },
  { label: "Lithuania" },
  { label: "Luxembourg" },
  { label: "Macau" },
  { label: "Macedonia, The Former Yugoslav Republic of" },
  { label: "Madagascar" },
  { label: "Malawi" },
  { label: "Malaysia" },
  { label: "Maldives" },
  { label: "Mali" },
  { label: "Malta" },
  { label: "Marshall Islands" },
  { label: "Martinique" },
  { label: "Mauritania" },
  { label: "Mauritius" },
  { label: "Mayotte" },
  { label: "Mexico" },
  { label: "Micronesia, Federated States of" },
  { label: "Moldova, Republic of" },
  { label: "Monaco" },
  { label: "Mongolia" },
  { label: "Montserrat" },
  { label: "Morocco" },
  { label: "Mozambique" },
  { label: "Myanmar" },
  { label: "Namibia" },
  { label: "Nauru" },
  { label: "Nepal" },
  { label: "Netherlands" },
  { label: "Netherlands Antilles" },
  { label: "New Caledonia" },
  { label: "New Zealand" },
  { label: "Nicaragua" },
  { label: "Niger" },
  { label: "Nigeria" },
  { label: "Niue" },
  { label: "Norfolk Island" },
  { label: "Northern Mariana Islands" },
  { label: "Norway" },
  { label: "Oman" },
  { label: "Pakistan" },
  { label: "Palau" },
  { label: "Panama" },
  { label: "Papua New Guinea" },
  { label: "Paraguay" },
  { label: "Peru" },
  { label: "Philippines" },
  { label: "Pitcairn" },
  { label: "Poland" },
  { label: "Portugal" },
  { label: "Puerto Rico" },
  { label: "Qatar" },
  { label: "Reunion" },
  { label: "Romania" },
  { label: "Russian Federation" },
  { label: "Rwanda" },
  { label: "Saint Kitts and Nevis" },
  { label: "Saint Lucia" },
  { label: "Saint Vincent and the Grenadines" },
  { label: "Samoa" },
  { label: "San Marino" },
  { label: "Sao Tome and Principe" },
  { label: "Saudi Arabia" },
  { label: "Senegal" },
  { label: "Seychelles" },
  { label: "Sierra Leone" },
  { label: "Singapore" },
  { label: "Slovakia (Slovak Republic)" },
  { label: "Slovenia" },
  { label: "Solomon Islands" },
  { label: "Somalia" },
  { label: "South Africa" },
  { label: "South Georgia and the South Sandwich Islands" },
  { label: "Spain" },
  { label: "Sri Lanka" },
  { label: "St. Helena" },
  { label: "St. Pierre and Miquelon" },
  { label: "Sudan" },
  { label: "Suriname" },
  { label: "Svalbard and Jan Mayen Islands" },
  { label: "Swaziland" },
  { label: "Sweden" },
  { label: "Switzerland" },
  { label: "Syrian Arab Republic" },
  { label: "Taiwan, Province of China" },
  { label: "Tajikistan" },
  { label: "Tanzania, United Republic of" },
  { label: "Thailand" },
  { label: "Togo" },
  { label: "Tokelau" },
  { label: "Tonga" },
  { label: "Trinidad and Tobago" },
  { label: "Tunisia" },
  { label: "Turkey" },
  { label: "Turkmenistan" },
  { label: "Turks and Caicos Islands" },
  { label: "Tuvalu" },
  { label: "Uganda" },
  { label: "Ukraine" },
  { label: "United Arab Emirates" },
  { label: "United Kingdom" },
  { label: "United States" },
  { label: "United States Minor Outlying Islands" },
  { label: "Uruguay" },
  { label: "Uzbekistan" },
  { label: "Vanuatu" },
  { label: "Venezuela" },
  { label: "Vietnam" },
  { label: "Virgin Islands (British)" },
  { label: "Virgin Islands (U.S.)" },
  { label: "Wallis and Futuna Islands" },
  { label: "Western Sahara" },
  { label: "Yemen" },
  { label: "Yugoslavia" },
  { label: "Zambia" },
  { label: "Zimbabwe" }
];
const states = [
  { label: 'Alabama' },
  { label: 'Alaska' },
  { label: 'Arizona' },
  { label: 'Arkansas' },
  { label: 'California' },
  { label: 'Colorado' },
  { label: 'Connecticut' },
  { label: 'Delaware' },
  { label: 'Florida' },
  { label: 'Georgia' },
  { label: 'Hawaii' },
  { label: 'Idaho' },
  { label: 'Illnois' },
  { label: 'Indiana' },
  { label: 'Iowa' },
  { label: 'Kansas' },
  { label: 'Kentucky' },
  { label: 'Louisiana' },
  { label: 'Maine' },
  { label: 'Maryland' },
  { label: 'Massachusetts' },
  { label: 'Michigan' },
  { label: 'Minnesota' },
  { label: 'Mississippi' },
  { label: 'Missouri' },
  { label: 'Montana' },
  { label: 'Nebraska' },
  { label: 'Nevada' },
  { label: 'New Hampshire' },
  { label: 'New Jersey' },
  { label: 'New Mexico' },
  { label: 'New York' },
  { label: 'North Carolina' },
  { label: 'North Dakota' },
  { label: 'Ohio' },
  { label: 'Oklahoma' },
  { label: 'Oregon' },
  { label: 'Pennsylvania' },
  { label: 'Rhode Island' },
  { label: 'South Carolina' },
  { label: 'South Dakota' },
  { label: 'Tennessee' },
  { label: 'Texas' },
  { label: 'Utah' },
  { label: 'Vermont' },
  { label: 'Virginia' },
  { label: 'Washington' },
  { label: 'West Virginia' },
  { label: 'Wisconsin' },
  { label: 'Wyoming' } 
]


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
      console.log("triggered");
      // user is creating a brand new account with email and password
      try {
        await auth.createUserWithEmailAndPassword(
          this.state.email,
          this.state.password
        );
      } catch (err) {
        alert(err.message);
        //! return something after the error so that it doesn't keep going
      }
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

    let uid = auth.currentUser.uid;
    console.log("hi hey look here", uid);
    // get all of their info so we can set up a listener and route them
    const userRef = firestore.collection("users").doc(uid);
    const userInfo = await userRef.get();
    console.log(userInfo);
    // set up the listener on app.js
    // console.log("setting up user listener!", userInfo);
    this.props.setupUserListener(userInfo);
    // console.log("rerouting user", userInfo.data());
    const routeTo = this.props.routeUser(userInfo.data());
    this.props.history.push(routeTo);
    this.props.userStore(auth.currentUser); //!added this, stores user info into redux store after signup

  };

  googleSignup = async e => {
    // people should only be clicking "sign up with google" if they werent redirected
    // get their google credentials
    //! currently, if they don't fill in the form fields, it will just create their account with google info
    //! we might need to make them fill some stuff out first, or instantly redirect them to a page
    //! where they need to edit (put in) their info like locationInfo.
    //! This also fills their email with '' right now
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
    console.log("hi hey look here", uid);
    const userInfo = await userRef.get();
    // set up the listener on app.js
    // console.log("setting up user listener!", userInfo);
    this.props.setupUserListener(userInfo);
    // console.log("rerouting user", userInfo.data());
    const routeTo = this.props.routeUser(userInfo.data());
    this.props.history.push(routeTo);
    this.props.userStore(auth.currentUser); //!added this, stores user info into redux store after googlesingup

  };

  render() {
    // console.log(this.props.user);
    return (
      <div className='signup-wrapper'>
        <form className='signup-form' onSubmit={this.handleSubmit}>
          <h5>Sign Up</h5>
          <TextField
            required
            id='standard-name'
            label='Name'
            value={this.state.fullName}
            onChange={this.handleChange}
            margin='normal'
            name='fullName'
          />
          <TextField
            required
            id='standard-name'
            label='Email'
            value={this.state.email}
            onChange={this.handleChange}
            margin='normal'
            name='email'
            type='email'
          />
          {!this.state.wasRedirected && (
            <TextField
              required
              className={`${this.state.wasRedirected ? "hidden" : ""}`}
              id='standard-password-input'
              type='password'
              label='Password'
              value={this.state.password}
              onChange={this.handleChange}
              margin='normal'
              name='password'
            />
          )}
          <TextField
            required
            id='standard-name'
            label='City'
            value={this.state.city}
            onChange={this.handleChange}
            margin='normal'
            name='city'
          />
          <TextField
            required
            id='standard-name'
            label='State or Province'
            value={this.state.stateProvince}
            onChange={this.handleChange}
            margin='normal'
            name='stateProvince'
          />
          <TextField
            required
            id='standard-name'
            label='Country'
            value={this.state.country}
            onChange={this.handleChange}
            margin='normal'
            name='country'
          />
          <TextField
            required
            id='standard-name'
            label='Phone Number'
            value={this.state.phoneNumber}
            onChange={this.handleChange}
            margin='normal'
            name='phoneNumber'
          />
          <TextField
            required
            id='standard-name'
            label='About Me'
            value={this.state.aboutMe}
            onChange={this.handleChange}
            margin='normal'
            name='aboutMe'
          />
          <FormControl style={{ minWidth: 160 }}>
            <InputLabel htmlFor='age-simple'>Account Type</InputLabel>
            <Select
              value={this.state.userType}
              onChange={e => {
                this.setState({
                  userType: e.target.value
                });
              }}
            >
              <MenuItem value='mentor'>Mentor</MenuItem>
              <MenuItem value='teacher'>Teacher</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant='contained'
            size='large'
            color='primary'
            onClick={this.handleSubmit}
          >
            Sign Up
          </Button>
        </form>
        {!this.state.wasRedirected && (
          <Button
            variant='contained'
            color='secondary'
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
    signUp: user => dispatch(signUp(user)),
    userStore: user => dispatch(userStore(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp); //!need first arg of null on connect if not using mapStateToProps
