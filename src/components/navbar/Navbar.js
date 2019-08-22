import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Calendar from '../calendar/Calendar';
// import MenuIcon from "@material-ui/icons/Menu";
// import { NavLink } from "react-router-dom";

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
var meetingTime = new Date();
var meetingTime2 = new Date();
meetingTime2.setDate(meetingTime.getDate() + 1);
var events = [{title: 'Meeting', start: meetingTime}, {title: 'Meeting', start: meetingTime2}]

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          />
          <Typography variant="h6" className={classes.title}>
            Future Hope School in the Sky
          </Typography>
          {/* <NavLink to="/mentors">View Mentors</NavLink> */}
          <a href='/mentors' alt='laaaaaaaammmmmeeeee'>
            <Button color="primary">
              View Mentors
            </Button>
          </a>
          <Button color="primary">Mission</Button>
          <Button color="primary" href='/login'>Login</Button>
          <Button color="primary" href='/signup'>SignUp</Button>
        </Toolbar>
      </AppBar>
      <Calendar events={events} />      
    </div>
  );

};

export default Navbar;
