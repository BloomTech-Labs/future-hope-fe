import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { auth } from "../../../config/fbConfig.js";
import Calendar from "../../calendar/Calendar.js";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//styles
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SideBar from "../../shared/components/Sidebar/SideBar.js";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    margin: "auto"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

const DashboardMentor = props => {
  const classes = useStyles();

  // const { auth } = props;
  // if (!auth.uid) {
  //   <Redirect to="/login" />;
  // }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3}>
            {/* Calendar */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Calendar />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default withRouter(connect(mapStateToProps)(DashboardMentor));
