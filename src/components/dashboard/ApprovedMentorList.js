import React from "react";
import Button from "@material-ui/core/Button";

const ApprovedMentorList = props => {
  const { users } = props;
  console.log("usersss", users);

  return (
    <div>
      <h2 className="table-heading">Approved Mentors</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Names</th>
            <th scope="col">Account Type</th>
            <th scope="col">City</th>
            <th scope="col">State/Province</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        {users.map(user => {
          if (user.userType === "mentor" && !user.approval) {
            return (
              <tbody key={user.uid}>
                <tr>
                  <td >{user.name}</td>
                  <td>{user.userType}</td>
                  <td>{user.city}</td>
                  <td>{user.stateProvince}</td>
                  <td>
                    <Button>View</Button>
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

export default ApprovedMentorList;