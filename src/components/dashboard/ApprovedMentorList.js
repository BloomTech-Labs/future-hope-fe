import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { firestore } from "../../config/fbConfig.js";
//import { Redirect } from "react-router-dom";
import "./Dashboard.css";

const ApprovedMentorList = props => {
  const [users, setUsers] = useState([]);
  const { auth, userInfo } = props;
  //if (!auth.uid) return <Redirect to="/" />;

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
      <h2 className="table-heading">Approved Mentors</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Profile Photo</th>
            <th scope="col">Names</th>
            <th scope="col">Account Type</th>
            <th scope="col">City</th>
            <th scope="col">State/Province</th>
            <th scope="col">View Profile</th>
          </tr>
        </thead>
        {users.map(user => {
          if (user.userType === "mentor" && !user.approved) {
            return (
              <tbody key={user.uid}>
                <tr>
                  <td>
                    {" "}
                    <img
                      className="dashboard-photo"
                      src={
                        user.profilePhoto ||
                        "https://source.unsplash.com/random/200x200"
                      }
                      alt="profile photo"
                    ></img>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.userType}</td>
                  <td>{user.city}</td>
                  <td>{user.stateProvince}</td>
                  <td>
                    <Button onClick={() => pushToProfilePage(user.uid)}>
                      View Profile
                    </Button>
                  </td>
                </tr>
              </tbody>
            );
          } else {
            return null;
          }
        })}
      </table>
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
