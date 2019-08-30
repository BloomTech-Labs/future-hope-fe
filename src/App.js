import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

// auth stuff
import { auth, firestore } from "./config/fbConfig.js";
import "firebase/auth";

// core components
import LandingPage from "./components/landingpage/LandingPage";
import SignUp from "./components/auth/SignUp.js";
import Login from "./components/auth/Login";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
// import SignedInNavBar from "./components/navbar/SignedInNavBar";
import MentorList from "./components/mentors/MentorList";
import FAQ from "./components/FAQ/FAQ";
//import Calendar from "./components/calendar/Calendar";
import AdminDashboard from "./components/dashboard/AdminDashboard.js";
import AwaitingApproval from "./components/views/AwaitingApproval.js";
import MentorProfile from "./components/views/MentorProfile.js";
//import ProfileView from "./components/views/ProfileView.js";
import ApprovedMentorList from "./components/dashboard/ApprovedMentorList.js";
import ApprovedTeacherList from "./components/dashboard/ApprovedTeacherList.js";
import ViewUserProfile from "./components/views/ViewUserProfile";
import MentorTable from "./components/dashboard/MentorTable";
import TeacherTable from "./components/dashboard/TeacherTable";


import "./App.css";

class App extends React.Component {
  unsubscribeFromAuth = null;
  unsubsribeFromUser = null;

  state = {
    rerouteUser: false,
    user: null,
    userListenerCreated: false
  };

  componentDidMount = () => {
    this.unsubsribeFromAuth = auth.onAuthStateChanged(async user => {
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
    let uid = user.uid;
    if (this.state.userListenerCreated) {
      return;
    }
    // console.log(uid);
    // takes in the user thats logged in
    // sets up listenever to their document
    this.unsubsribeFromUser = firestore
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

  routeUser = user => {
    if (user.userType === "mentor") {
      // this.props.history.push("/mentor_dahsboard");
      return "/mentor_dashboard";
    } else if (user.userType === "teacher") {
      // this.props.history.push("/teacher_dahsboard");
      return "/teacher_dashboard";
    } else if (user.userType === "admin") {
      return "/admin-dashboard";
    } else {
      this.props.history.push("/");
      return "/";
    }
  };

  componentWillUnmount = () => {
    this.unsubscribeFromAuth(); //clean up after yourself
    this.unsubsribeFromUser();
  };

  render() {
    return (
      <Router>
        {auth.currentUser ? <SignedInNavBar /> : <Navbar />}
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/mentors" component={MentorList} />
          <Route path="/FAQ" component={FAQ} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/approved-teachers" component={ApprovedTeacherList} />
          <Route path="/approved-mentors" component={ApprovedMentorList} />
          <Route path="/view-profile" component={ViewUserProfile} />
          <Route
            exact
            path="/signup"
            render={props => (
              <SignUp
                setupUserListener={this.setupUserListener}
                routeUser={this.routeUser}
                {...props}
              />
            )}
          />
          <Route
            path="/login"
            render={props => (
              <Login
                setupUserListener={this.setupUserListener}
                routeUser={this.routeUser}
                {...props}
                rerouteUser={this.state.rerouteUser}
              />
            )}
          />
          <Route path="/profile/:uid" component={ViewUserProfile} />
          <Route path="/applicationstatus" component={AwaitingApproval} />
          <Route path="/mentor-table" component={MentorTable} />
          <Route path="/teacher-table" component={TeacherTable} />
        </Switch>

      </Router>
    );
  }
}

export default withRouter(App);
