import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { auth } from "../../config/fbConfig.js";
import { auth } from "../../config/fbConfig";
import { Redirect } from "react-router";

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
          <Button color="primary">Profile</Button>
          <Button color="primary">Appointments</Button>
          <Button
            color="primary"
            onClick={e => {
              auth.signOut();
              // props.history.push("/");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default SignedInNavBar;
