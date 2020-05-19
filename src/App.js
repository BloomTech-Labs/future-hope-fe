import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  useRouteMatch
} from "react-router-dom";

//analytics
import { initGA, logPageView } from "./components/Analytics";

// auth stuff
import { auth, firestore } from "./config/fbConfig.js";
import "firebase/auth";

// core components
import LandingPage from "./components/landingpage/LandingPage";
import LandingMission from "./components/landingpage/LandingMission";
import SignUp from "./components/auth/SignUp.js";
import Login from "./components/auth/Login";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import MentorList from "./components/mentors/MentorList";
import FAQ from "./components/FAQ/FAQ";
import AwaitingApproval from "./components/views/AwaitingApproval.js";
import ApprovedMentorList from "./components/dashboard/ApprovedMentorList.js";
import ApprovedTeacherList from "./components/dashboard/ApprovedTeacherList.js";
import ApprovedAdminList from './components/dashboard/ApprovedAdmins'
import Messaging from "./components/Messaging/Messaging.js";
import NewUserProfile from "./components/views/NewUserProfile.js";
import EditProfileView from "./components/views/EditProfileView.js";
import UserApproval from "./components/dashboard/admin-dashboard/UserApproval.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import UpdatedList from "./components/dashboard/UpdatedList";
import AddMaterial from "./components/dashboard/admin-dashboard/AddMaterials.js";
import OnBoarding from "./components/shared/components/OnBoarding.js";
import PrivacyPolicy from './components/MobileAppPrivacyPolicy'
import ContactForm from './components/contact/ContactForm.js'
import ForumMain from './components/forum/ForumMain'
import ForumThread from './components/forum/ForumThread'
import "./components/styles/App.css";
import PrivateRoute from "./components/auth/PrivateRoute";

class App extends React.Component {
  unsubscribeFromAuth = null;
  unsubscribeFromUser = null;

  state = {
    rerouteUser: false,
    user: null,
    userListenerCreated: false
  };

  componentDidMount = () => {
    initGA();
    logPageView();
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        let userRef = firestore.collection("users").doc(uid);
        let isUser = await userRef.get();
        if (isUser.exists) {
          this.setupUserListener(isUser.data());
        } else {
          // create the baseline user entry and place it into the database
          await userRef.set({
            uid,
            email,
            fullName: displayName || "",
            photoURL: photoURL || ""
          });
          let userReturn = await userRef.get();
          // get it back, put it in state, and forward to the rest of the login
          this.setState({
            user: userReturn.data(),
            rerouteUser: true
          });
        }
      }
    });
  };

  setupUserListener = user => {
    if (this.state.userListenerCreated) {
      return;
    }
    // takes in the user thats logged in
    // sets up listenever to their document
    this.unsubscribeFromUser = firestore
      .collection("users")
      .doc(`${user.uid}`)
      .onSnapshot(snapshot => {
        let curStateOfUser = {
          uid: snapshot.id,
          ...snapshot.data()
        };
      });
    this.setState({
      userListenerCreated: true
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromAuth(); //clean up after yourself
    this.unsubscribeFromUser();
  };

  render() {
    return (
      <Router>
        <Navbar {...this.props} />
        <div className="app-container">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/mission" component={LandingMission} />
            <Route path="/mentors" component={MentorList} />
            <Route path="/FAQ" component={FAQ} />
            <PrivateRoute path="/approved-teachers" component={ApprovedTeacherList} />
            <PrivateRoute path="/approved-mentors" component={ApprovedMentorList} />
            <PrivateRoute path='/approved-admins' component={ApprovedAdminList} />
            <Route path="/view-profile" component={NewUserProfile} />
            <Route
              exact
              path="/signup"
              render={props => (
                <SignUp setupUserListener={this.setupUserListener} {...props} />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <Login
                  setupUserListener={this.setupUserListener}
                  {...props}
                  rerouteUser={this.state.rerouteUser}
                />
              )}
            />
            <Route path="/profile/:uid" component={NewUserProfile} />
            <PrivateRoute path="/messaging" component={Messaging} />
            <Route path="/applicationstatus" component={AwaitingApproval} />
            <PrivateRoute path="/training/:topic" component={UpdatedList} />
            <PrivateRoute path="/training" component={UpdatedList} />
            <PrivateRoute path="/dashboard/:test" component={Dashboard} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/update_profile" component={EditProfileView} />
            <PrivateRoute path="/user-approval" component={UserApproval} />
            <PrivateRoute path="/add-materials" component={AddMaterial} />
            <PrivateRoute path="/on_boarding" component={OnBoarding} />
            <Route path='/privacy-policy' component={PrivacyPolicy} />
            <Route path='/contact' component={ContactForm} />
            <Route exact path='/forums' ><ForumMain /></Route>
            <Route path='/forums/thread/:id' ><ForumThread /></Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default withRouter(App);
