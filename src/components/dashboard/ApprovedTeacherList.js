import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { firestore } from "../../config/fbConfig.js";

//styles
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Fab from '@material-ui/core/Fab';

// Internal Components
import SideBar from "../shared/components/Sidebar/SideBar.js";

import "../styles/Dashboard.css";

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
  city: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    }
  }
}));

const ApprovedTeacherList = (props) => {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    firestore.collection("users").onSnapshot((querySnapshot) => {
      let userArray = [];
      querySnapshot.forEach((doc) => {
        userArray.push({
          approved: doc.data().awaitingApproval,
          name: doc.data().fullName,
          photoURL: doc.data().photoUrl,
          userType: doc.data().userType,
          city: doc.data().city,
          stateProvince: doc.data().stateProvince,
          uid: doc.data().uid,
        });
      });
      setUsers(userArray);
    });
  }, []);

  const pushToProfilePage = (uid) => {
    props.history.push(`/profile/${uid}`);
  };

  const mobile = window.screen.width <= 600 ? true : false
  const tablet = window.screen.width <= 900 ? true : false

  return (
    <div className="flex">
      <SideBar />
      <Paper className={classes.paper} elevation={20}>
        <Typography align="center" component="h2" variant="h2" gutterBottom>
          Teachers
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell scope="col">Profile Photo</TableCell>
              <TableCell scope="col">Name</TableCell>
              {tablet ? "" : <TableCell className={classes.city} scope="col">City</TableCell>}
              {mobile ? "" : <TableCell scope="col">State/ Province</TableCell>}
              <TableCell scope="col">More Info</TableCell>
            </TableRow>
          </TableHead>
          {users.map(user => {
            if (user.userType === "teacher" && !user.approved) {
              return (
                <TableBody key={user.uid}>
                  <TableRow>
                    <TableCell>
                      {" "}
                      <Avatar
                        id="approved-list-photo"
                        src={
                          user.photoURL ||
                          "https://firebasestorage.googleapis.com/v0/b/future-hope-school.appspot.com/o/users%2Fblank_user%2Fblank_user.png?alt=media&token=9a7ffce8-9fc6-40ef-9678-ad5cf6449eaa"
                        }
                        alt="profile photo"
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    {/* <TableCell>{user.userType}</TableCell> */}
                    {tablet ? "" : <TableCell className={classes.city}>{user.city}</TableCell>}
                    {mobile ? "" : <TableCell>{user.stateProvince}</TableCell>}
                    <TableCell>
                      <Fab aria-label="arrow" size="small">
                        <ArrowForwardIcon onClick={() => pushToProfilePage(user.uid)} style={{ color: "#ff9800" }} />
                      </Fab>
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            } else {
              return null;
            }
          })}
        </Table>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
  };
};

export default withRouter(connect(mapStateToProps)(ApprovedTeacherList));
