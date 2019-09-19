import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { auth } from "../../config/fbConfig.js";
import Calendar from "../calendar/Calendar";
import { Redirect } from "react-router";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 90
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

// No more sample data required
// var meetingTime = new Date(2019, 7, 26, 12, 45, 0, 0);
// var meetingTime2 = new Date(2019, 7, 27, 12, 45, 0, 0);
// let meetingTime3 = new Date(1566879597866);

// var events = [
//   { title: 'Meeting', start: meetingTime },
//   { title: 'Meeting', start: meetingTime2 },
//   { title: 'Testing', start: meetingTime3 }
// ];

const SignedInNavBar = props => {
  const classes = useStyles();

  function logout() {
    auth.signOut();
    props.history.push("/login");
  }

  return (
    <div className={classes.root}>
      <AppBar elevation={1} position="fixed" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          />
          <Typography
            component={NavLink}
            onClick={() => props.history.push("/dashboard")}
            variant="h6"
            className={classes.title}
          >
            Future Hope School in the Sky
          </Typography>
          <Button color="primary" href={`/profile/${props.userInfo.uid}`}>
            Profile
          </Button>
          <Button color="primary">Appointments</Button>
          <Button color="primary" href="/login" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

//* This state.firebase.profile gives us all the profile info automatically stored into redux by firebase. Neat.
const mapStateToProps = state => {
  return {
    userInfo: state.firebase.profile
  };
};

export default withRouter(connect(mapStateToProps)(SignedInNavBar));
