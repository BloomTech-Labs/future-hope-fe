import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  
} from "react-router-dom";
import {  auth, firestore } from './config/fbConfig.js';


import 'firebase/auth';
import LandingPage from "./components/LandingPage";
import Page404 from "./components/Page404";
import SignUp from "./components/auth/SignUp.js";
import Login from "./components/auth/Login";


import "./App.css";


class App extends React.Component{
  unsubscribeFromAuth = null;
  user = null;

  componentDidMount = () => {
    this.unsubsribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        let userRef = firestore.collection("users").doc(uid);
        let isUser = await userRef.get();
        console.log(isUser, 'isUser');
        if (isUser.exists) {
         console.log('user exists', isUser);
        //!  this.props.history.push() Awaiting initial component after login success
        } else if (this.props.match.path === '/signup/mentor' || this.props.match.path === '/signup/teacher') {
          await userRef.set({
            uid: this.props.user.uid,
            email: this.props.user.email,
            fullName: this.props.displayName,
            photoUrl: this.props.photoURL,
          });      
            let userReturn = await userRef.get();
          console.log(userReturn, 'user returned')
        } else {
          alert('Please sign up for an account');
          this.props.history.push('/signup/mentor')
          //* put code to tell them/redirect them to signup page here

        }
      }
    });
  };
  componentWillUnmount = () => {
    this.unsubscribeFromAuth(); //clean up after yourself
  }

  

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route
            exact
            path='/signup/mentor'
            render={props => <SignUp {...props} type='Mentor' user={this.user}/>}
          />
          <Route
            exact
            path='/signup/teacher'
            render={props => <SignUp {...props} type='Teacher' user={this.user}/>}
          />
          <Route path='/login'
            component = {Login}
          />
          
          
        </Switch>
      </Router>
    );
  }
}

export default withRouter(App);

