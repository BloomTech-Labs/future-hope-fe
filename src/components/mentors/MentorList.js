//map over mentors here
//remove mentorList from App create a Home component
import React from "react";
import { connect } from "react-redux";
import MentorPublicPage from "./MentorPublicPage";
import "./mentors.css";

const MentorList = props => {
  const { mentors } = props;
  return (
    <div>
      <h1 className="mentor-page-title">
        Our <span className="mentor-page-title-span">BECE Mentors</span> are
        retired professionals living all over the globe.
      </h1>
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
//limit to fetching 20 for the public page
