import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { auth } from "../../config/fbConfig.js";
import { Redirect } from "react-router";
import { connect } from 'react-redux';



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

const SignedInNavBar = props => {
  const classes = useStyles();
  console.log('navbarprops', props);
  console.log('uid', props.userInfo.uid);
  function logout() {
    auth.signOut();
    // props.history.push("/login");
    //! for some reason we couldn't get history props to this component, so we had to do a round about kinda way
  }

  return (
    <div className={classes.root}>
      <AppBar elevation={1} position="fixed" color="inherit">
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
          <Button color="primary" href = {`/profile/${props.userInfo.uid}`}>Profile</Button> 
          <Button color="primary">Appointments</Button>
          <Button
            color="primary"
            href = '/login'
            onClick={ logout }
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};


//* This state.firebase.profile gives us all the profile info automatically stored into redux by firebase. Neat.
const mapStateToProps = (state) => {
  return {
    userInfo: state.firebase.profile
  }
}

export default connect(mapStateToProps)(SignedInNavBar);
