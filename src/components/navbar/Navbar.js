import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { auth } from "../../config/fbConfig.js";
import SignedInNavBar from "./SignedInNavBar.js";
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

const Navbar = () => {
  const classes = useStyles();
  if (!auth.currentUser) {
    return (
      <div className={classes.root}>
        <AppBar position='fixed' color='inherit'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            />
            <Typography variant='h6' className={classes.title}>
              Future Hope School in the Sky
            </Typography>
            {/* <NavLink to="/mentors">View Mentors</NavLink> */}
            <a href='/mentors' alt='laaaaaaaammmmmeeeee'>
              <Button color='primary'>View Mentors</Button>
            </a>
            <Button color='primary'>Mission</Button>
            <Button color='primary' href='/login'>
              Login
            </Button>
            <Button color='primary' href='/signup'>
              SignUp
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    //! if user is logged in, auth.currentUser exists, so show signedInNavBar
    return <SignedInNavBar />;
  }
};

export default Navbar;

/*
 <Button color='primary' onClick={() => auth.signOut()}>
            Sign Out
          </Button>
*/
