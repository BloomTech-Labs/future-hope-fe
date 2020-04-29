import React, { useState, useEffect } from "react";
import { firestore } from "../../../config/fbConfig.js";
import swal from "@sweetalert/with-react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import MentorTable from "./MentorTable.js";
import TeacherTable from "./TeacherTable.js";
import SideBar from "../../shared/components/Sidebar/SideBar.js";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
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
  fixedHeight: {
    height: 240
  }
}));

export default function UserApproval(props) {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  const approveUser = userUID => {
    firestore
      .collection("users")
      .doc(userUID)
      .update({ awaitingApproval: false })
      .then(() => {
        swal(`Selected user account has been approved`, {
          icon: "success"
        });
      })
      .catch(() => {
        swal("There was a server error, selected user could not be approved", {
          icon: "warning"
        });
      });
  };

  useEffect(() => {
    firestore
      .collection("users")
      .where("awaitingApproval", "==", true)
      .onSnapshot(querySnapshot => {
        let userArray = [];
        querySnapshot.forEach(doc => {
          userArray.push({
            awaitingApproval: doc.data().awaitingApproval,
            fullName: doc.data().fullName,
            userType: doc.data().userType,
            city: doc.data().city,
            stateProvince: doc.data().stateProvince,
            uid: doc.data().uid
          });
        });
        setUsers(userArray);
      });
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar />
      <main className={classes.content}>
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3}>
            {/* Mentor Table */}
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={15}>
                <MentorTable
                  users={users}
                  history={props.history}
                  approveUser={approveUser}
                />
              </Paper>
            </Grid>
            {/* Teacher Table */}
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={15}>
                <TeacherTable
                  users={users}
                  history={props.history}
                  approveUser={approveUser}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
