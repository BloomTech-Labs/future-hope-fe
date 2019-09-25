import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MentorPublicPage from "./MentorPublicPage";
import { firestore } from "../../config/fbConfig";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "./mentors.css";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

const MentorList = props => {
  const classes = useStyles();
  // const { mentors } = props;

  const [mentors, setMentors] = useState([]);
  let unsubscribeFromMentors = null;

  useEffect(() => {
    // sets up the listener for mentors.
    // currently limits to only 6 so that were not making huge queries.
    // wel need to add an infinite scroll so that when
    // we get to the end, this will load more mentors.
    unsubscribeFromMentors = firestore
      .collection("/users")
      .where("userType", "==", "mentor")
      .limit(6)
      .onSnapshot(users => {
        // console.log(user.docs);
        const holdUsers = [];
        users.docs.map(user => {
          const userDoc = {
            id: user.id,
            ...user.data()
          };
          holdUsers.push(userDoc);
          // console.log(userDoc);
        });

        setMentors(holdUsers);
      });
  }, []);

  // essentiall think of this as componentWillUnmount
  // this function will be called when the component unmounts
  useEffect(() => {
    return () => {
      unsubscribeFromMentors();
    };
  }, []);

  return (
    <Paper className={classes.paper}>
      <div>
        <h1 className="mentor-page-title">
          Our <span className="mentor-page-title-span">Mentors</span> are
          retired professionals living across the globe.
        </h1>
        <div className="mentor-page-cards-wrapper">
          {mentors.map(mentor => (
            <MentorPublicPage mentorData={mentor} key={mentor.id} />
          ))}
        </div>
      </div>
    </Paper>
  );
};

const mapStateToProps = state => {
  // console.log(state);
  return {
    // mentors: state.mentors.mentors
  };
};

export default connect(mapStateToProps)(MentorList);
