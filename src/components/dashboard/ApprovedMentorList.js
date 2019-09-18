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
import SideBar from "../shared/components/Sidebar/SideBar.js";

import "./Dashboard.css";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

const ApprovedMentorList = props => {
  const [users, setUsers] = useState([]);
  const { auth, userInfo } = props;
  //if (!auth.uid) return <Redirect to="/" />;
  const classes = useStyles();

  useEffect(() => {
    approvedMentors();
  }, []);

  const approvedMentors = async () => {
    let userArray = [];
    const userRef = firestore.collection("users");
    await userRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        //console.log(doc.data());
        userArray.push({
          approved: doc.data().awaitingApproval,
          name: doc.data().fullName,
          profilePhoto: doc.data().photoUrl,
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

  //if (!auth.uid) return <Redirect to="/" />;
  return (
    <div>
      <SideBar />
      <Paper className={classes.paper} elevation={20}>
        <Typography align='center' component='h2' variant='h2' gutterBottom>
          Approved Mentors
        </Typography>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell scope='col'>Profile Photo</TableCell>
              <TableCell scope='col'>Names</TableCell>
              <TableCell scope='col'>Account Type</TableCell>
              <TableCell scope='col'>City</TableCell>
              <TableCell scope='col'>State/Province</TableCell>
              <TableCell scope='col'>View Profile</TableCell>
            </TableRow>
          </TableHead>
          {users.map(user => {
            if (user.userType === "mentor" && !user.approved) {
              return (
                <TableBody key={user.uid}>
                  <TableRow>
                    <TableCell>
                      {" "}
                      <img
                        id='approved-list-photo'
                        src={
                          user.profilePhoto ||
                          "https://source.unsplash.com/random/200x200"
                        }
                        alt='profile photo'
                      ></img>
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
    users: state.firestore.ordered.users,
    userInfo: state.firebase.profile
  };
};

export default withRouter(connect(mapStateToProps)(ApprovedMentorList));
