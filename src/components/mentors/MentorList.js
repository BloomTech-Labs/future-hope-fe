//map over mentors here
//remove mentorList from App create a Home component
import React from "react";
import { connect } from "react-redux";
import MentorPublicPage from "./MentorPublicPage";

const MentorList = props => {
  const { mentors } = props;
  return (
    <div>
      <h2>Our Mentors Span Across the Globe</h2>
      {mentors.map(mentor => (
        <MentorPublicPage mentorData={mentor} key={mentor.id} />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  // console.log(state);
  return {
    mentors: state.mentors.mentors
  };
};

export default connect(mapStateToProps)(MentorList);

//will need to mapStateToProps here to access mentors from firebase once we have some menyors entered.
//for now we use dummy-data to render info to the page
