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

import SideBar from "../shared/components/Sidebar/SideBar.js";

import "./Dashboard.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "15vw",
      width: "80%",
    },
    [theme.breakpoints.up("md")]: {
      margin: "0 auto",
    },
  },
  city: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    }
  }
}));

const ApprovedMentorList = (props) => {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    approvedMentors();
  }, []);

  const approvedMentors = async () => {
    let userArray = [];
    const userRef = firestore.collection("users");
    await userRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        userArray.push({
          approved: doc.data().awaitingApproval,
          name: doc.data().fullName,
          photoUrl: doc.data().photoUrl,
          userType: doc.data().userType,
          city: doc.data().city,
          stateProvince: doc.data().stateProvince,
          uid: doc.data().uid,
        });
      });
    });
    setUsers(userArray);
  };

  const pushToProfilePage = (uid) => {
    props.history.push(`/profile/${uid}`);
  };

  return (
    <div className="flex">
      <SideBar />
      <Paper className={classes.paper} elevation={20}>
        <Typography align="center" component="h2" variant="h2" gutterBottom>
          Approved Mentors
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell scope="col">Profile Photo</TableCell>
              <TableCell scope="col">Name</TableCell>
              {/* <TableCell scope="col">Account Type</TableCell> */}
              <TableCell className={classes.city} scope="col">City</TableCell>
              <TableCell scope="col">State/ Province</TableCell>
              <TableCell scope="col">View Profile</TableCell>
            </TableRow>
          </TableHead>
          {users.map((user) => {
            if (user.userType === "mentor" && !user.approved) {
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
                    {/* <TableCell>{user.userType}</TableCell> */}
                    <TableCell className={classes.city}>{user.city}</TableCell>
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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    userInfo: state.firebase.profile,
  };
};

export default withRouter(connect(mapStateToProps)(ApprovedMentorList));
