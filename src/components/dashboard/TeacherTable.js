import React from "react";

const TeacherTable = () => {
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Names</th>
            <th scope="col">Date Submitted</th>
            <th scope="col">Account Type</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Sept 20, 2018</td>
            <td>Mentor</td>
            <td>California</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Mark</td>
            <td>Sept 20, 2018</td>
            <td>Mentor</td>
            <td>California</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Mark</td>
            <td>Sept 20, 2018</td>
            <td>Mentor</td>
            <td>California</td>
          </tr>
        </tbody>
      </table>
      ;
    </div>
  );
};

export default TeacherTable;
