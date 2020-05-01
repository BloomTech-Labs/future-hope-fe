import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

//styles
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// Internal Components
import SideBar from "../shared/components/Sidebar/SideBar.js";
import Calendar from "../calendar/Calendar.js";
import AwaitingApproval from "../views/AwaitingApproval.js";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    width: "90vw",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10vw",
    },
    [theme.breakpoints.up("md")]: {
      margin: "0 auto",
    },
  },
  container: {
    // marginTop: theme.spacing(0),
    // marginBottom: theme.spacing(3),
    // paddingBottom: theme.spacing(4),
    // flexDirection: "column",
    // [theme.breakpoints.up("md")]: {
    //   margin: "0 auto",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   marginTop: theme.spacing(0),
    //   marginLeft: "15vw",
    //   width: "80%",
    // },
    // [theme.breakpoints.up("xs")]: {
    //   marginLeft: "17.4vw",
    //   width: "80%",
    // },
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      margin: "0 auto",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "100%",
      [theme.breakpoints.up("xs")]: {
        marginLeft: "4vw",
        width: "96%",
      },
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const AdminDashboard = (props) => {
  useEffect(() => {
    if (props && props.userInfo && props.userInfo.awaitingApproval) {
      if (props && props.userInfo && props.userInfo.userType === "admin") {
        return;
      } else {
        props.history.push("/applicationstatus");
      }
    }
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    userInfo: state.firebase.profile, //need access to the users collection instead to check userType and render props in the tables
  };
};
export default withRouter(connect(mapStateToProps)(AdminDashboard));
