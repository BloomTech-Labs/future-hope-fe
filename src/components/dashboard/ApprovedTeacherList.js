import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { firestore } from "../../config/fbConfig.js";
//import { Redirect } from "react-router-dom";
import "./Dashboard.css";

class ApprovedTeacherList extends Component {
  state = {
    users: []
  };

  componentDidMount = async () => {
    let userArray = [];
    const userRef = firestore.collection("users");
    const userList = await userRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data());
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
    this.setState({
      users: userArray
    });
    console.log("userArray", userArray);
  };

  pushToProfilePage = uid => {
    this.props.history.push(`/profile/${uid}`);
  };


  render() {
    const { auth } = this.props;
    const { users } = this.state;
    console.log("auth", auth);

    //if (!auth.uid) return <Redirect to="/" />;
    return (
      <div>
        <h2 className="table-heading">Approved Teachers</h2>
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
            if (user.userType === "teacher" && !user.approved) {
              return (
                <tbody key={user.uid}>
                  <tr>
                    <td> <img src={user.profilePhoto || "https://source.unsplash.com/random/200x200"} alt="profile photo"></img></td>
                    <td>{user.name}</td>
                    <td>{user.userType}</td>
                    <td>{user.city}</td>
                    <td>{user.stateProvince}</td>
                    <td>
                      <Button onClick={() => this.pushToProfilePage(user.uid)}>View</Button>
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
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users
  };
};

export default connect(mapStateToProps)(ApprovedTeacherList);