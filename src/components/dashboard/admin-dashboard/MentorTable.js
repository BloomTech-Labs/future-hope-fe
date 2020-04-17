import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import "../../styles/Dashboard.css";

const MentorTable = props => {
  const { users, history } = props;

  const pushToProfilePage = uid => {
    history.push(`/profile/${uid}`);
  };

  return (
    <div>
      <h6 className="dashboard-table-title">Pending Mentor Applications</h6>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Account Type</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State/Province</TableCell>
            <TableCell>View</TableCell>
            <TableCell>Approve User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => {
            if (user.userType === "mentor") {
              return (
                <TableRow key={user.uid}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.userType}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.stateProvince}</TableCell>
                  <TableCell>
                    <Button onClick={() => pushToProfilePage(user.uid)}>
                      View
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      onClick={e => {
                        e.preventDefault();
                        props.approveUser(user.uid);
                      }}
                    >
                      Approve
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

export default MentorTable;
