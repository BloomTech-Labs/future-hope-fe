import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import "../Dashboard.css";

const TeacherTable = props => {
  const { users, history } = props;
  console.log("usersss", users);

  const pushToProfilePage = uid => {
    history.push(`/profile/${uid}`);
  };

  return (
    <div>
      <h6 className="dashboard-table-title">Pending Teacher Applications</h6>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Account Type</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State/Province</TableCell>
            <TableCell>View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => {
            if (user.userType === "teacher" && user.approval) {
              return (
                <TableRow key={user.uid}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.userType}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.stateProvince}</TableCell>
                  <TableCell>
                    <Button onClick={() => pushToProfilePage(user.uid)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            } else {
              return null;
            }
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeacherTable;
