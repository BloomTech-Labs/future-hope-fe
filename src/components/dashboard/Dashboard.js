import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

//styles
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

// Internal Components
import SideBar from "../shared/components/Sidebar/SideBar.js";
import Calendar from "../calendar/Calendar.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    margin: "auto",
    padding: theme.spacing(2),
    width: "70%",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      margin: "0 auto",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(0),
      marginLeft: "15vw",
      width: "80%",
      [theme.breakpoints.up("xs")]: {
        marginLeft: "17.4vw",
        width: "80%",
      },
    },
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
    <div className="flex">
      <SideBar />
      <Paper className={classes.paper} elevation={20}>
        <Calendar />
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    userInfo: state.firebase.profile,
  };
};
export default withRouter(connect(mapStateToProps)(AdminDashboard));
