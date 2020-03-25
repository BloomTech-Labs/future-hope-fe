import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

//analytics
import { initGA, logPageView } from "./components/Analytics";

// auth stuff
import { auth, firestore } from "./config/fbConfig.js";
import "firebase/auth";

// core components
import LandingPage from "./components/landingpage/LandingPage";
import LandingMission from "./components/landingpage/components/LandingMission";
import SignUp from "./components/auth/SignUp.js";
import Login from "./components/auth/Login";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import MentorList from "./components/mentors/MentorList";
import FAQ from "./components/FAQ/FAQ";
// import Calendar from "./components/calendar/Calendar";
// import AdminDashboard from "./components/dashboard/admin-dashboard/AdminDashboard.js";
import AwaitingApproval from "./components/views/AwaitingApproval.js";
import ApprovedMentorList from "./components/dashboard/ApprovedMentorList.js";
import ApprovedTeacherList from "./components/dashboard/ApprovedTeacherList.js";
// import ViewUserProfile from "./components/views/ViewUserProfile";
import ApprovedAdminList from './components/dashboard/ApprovedAdmins'
import Messaging from "./components/Messaging/Messaging.js";
import MentorTable from "./components/dashboard/admin-dashboard/MentorTable";
import TeacherTable from "./components/dashboard/admin-dashboard/TeacherTable";
import NewUserProfile from "./components/views/NewUserProfile.js";
import EditProfileView from "./components/views/EditProfileView.js";
import UserApproval from "./components/dashboard/admin-dashboard/UserApproval.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import UpdatedList from "./components/dashboard/UpdatedList";
import AddMaterial from "./components/dashboard/admin-dashboard/AddMaterials.js";
import OnBoarding from "./components/shared/components/OnBoarding.js";
import PrivacyPolicy from './components/MobileAppPrivacyPolicy'
import ForumMain from './components/forum/ForumMain'
import "./App.css";

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
        // console.log(isUser, "isUser");
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
          // console.log(userReturn.data(), "user returned");
        }
      }
    });
  };

  setupUserListener = user => {
    if (this.state.userListenerCreated) {
      return;
    }
    // console.log(uid);
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
        // console.log("cur state of user", curStateOfUser);
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
            <Route path="/approved-teachers" component={ApprovedTeacherList} />
            <Route path="/approved-mentors" component={ApprovedMentorList} />
            <Route path='/approved-admins' component={ApprovedAdminList} />
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
            <Route path="/messaging" component={Messaging} />
            <Route path="/applicationstatus" component={AwaitingApproval} />
            <Route path="/mentor-table" component={MentorTable} />
            <Route path="/teacher-table" component={TeacherTable} />
            <Route path="/training/:topic" component={UpdatedList} />
            <Route path="/training" component={UpdatedList} />
            <Route path="/dashboard/:test" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/update_profile" component={EditProfileView} />
            <Route path="/user-approval" component={UserApproval} />
            <Route path="/add-materials" component={AddMaterial} />
            <Route path="/on_boarding" component={OnBoarding} />
            <Route path='/mobile-app-privacy-policy' component={PrivacyPolicy} />
            <Route path='/forums' ><ForumMain /></Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default withRouter(App);
