import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { firestore } from "../../config/fbConfig.js";
//import { Redirect } from "react-router-dom";

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

// Internal Components
import SideBar from "../shared/components/Sidebar/SideBar.js";

import "./Dashboard.css";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    // marginLeft: theme.spacing(2),
    // marginRight: theme.spacing(2),
    margin: "auto",
    padding: theme.spacing(2),
    width: "70%",
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

const ApprovedTeacherList = props => {
  const [users, setUsers] = useState([]);
  //if (!auth.uid) return <Redirect to="/" />;
  const classes = useStyles();

  const approvedTeachers = async () => {
    let userArray = [];
    const userRef = firestore.collection("users");
    await userRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // console.log(doc.data());
        userArray.push({
          approved: doc.data().awaitingApproval,
          name: doc.data().fullName,
          photoURL: doc.data().photoUrl,
          userType: doc.data().userType,
          city: doc.data().city,
          stateProvince: doc.data().stateProvince,
          uid: doc.data().uid
        });
      });
    });
    setUsers(userArray);
    console.log("setUsers", users);
  };

  const pushToProfilePage = uid => {
    props.history.push(`/profile/${uid}`);
  };

  return (
    <div className="flex">
      <SideBar />
      <Paper className={classes.paper} elevation={20}>
        <Typography align="center" component="h2" variant="h2" gutterBottom>
          Approved Teachers
        </Typography>
        <Table stickyheader>
          <TableHead>
            <TableRow>
              <TableCell scope="col">Profile Photo</TableCell>
              <TableCell scope="col">Names</TableCell>
              <TableCell scope="col">Account Type</TableCell>
              <TableCell scope="col">City</TableCell>
              <TableCell scope="col">State/Province</TableCell>
              <TableCell scope="col">View Profile</TableCell>
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
                          user.photoUrl ||
                          "https://firebasestorage.googleapis.com/v0/b/future-hope-school.appspot.com/o/users%2Fblank_user%2Fblank_user.png?alt=media&token=9a7ffce8-9fc6-40ef-9678-ad5cf6449eaa"
                        }
                        alt="profile photo"
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.userType}</TableCell>
                    <TableCell>{user.city}</TableCell>
                    <TableCell>{user.stateProvince}</TableCell>
                    <TableCell>
                      <Button onClick={() => pushToProfilePage(user.uid)}>
                        View Profile
                      </Button>
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

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users
  };
};

export default withRouter(connect(mapStateToProps)(ApprovedTeacherList));
