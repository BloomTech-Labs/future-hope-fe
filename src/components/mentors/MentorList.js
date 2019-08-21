//map over mentors here
import React from "react";
import mentors from "./mentor-data";
import MentorPublicPage from "./MentorPublicPage";

const MentorList = () => {
  console.log(mentors);
  return (
    <>
      <div>
        <h2>Our Mentors</h2>
        <div>
          {mentors.map(mentor => (
            <MentorPublicPage mentorData={mentor} key={mentor.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MentorList;

//will need to mapStateToProps here to access mentors from firebase once we have some menyors entered.
//for now we use dummy-data to render info to the page
