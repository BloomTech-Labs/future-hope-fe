import React from "react";
import Button from "@material-ui/core/Button";

const TeacherTable = () => {
  return (
    <div>
      <h2 className="table-heading">Pending Teacher Applications</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Names</th>
            <th scope="col">Date Submitted</th>
            <th scope="col">Account Type</th>
            <th scope="col">Location</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Sept 20, 2018</td>
            <td>Teacher</td>
            <td>California</td>
            <td>
              <Button>View</Button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Mark</td>
            <td>Sept 20, 2018</td>
            <td>Teacher</td>
            <td>California</td>
            <td><Button>View</Button></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Mark</td>
            <td>Sept 20, 2018</td>
            <td>Teacher</td>
            <td>California</td>
            <td><Button>View</Button></td>
          </tr>
        </tbody>
      </table>
      ;
    </div>
  );
};

export default TeacherTable;
