import React from "react";

const MentorPublicPage = props => {
  const mentors = props.mentorData;
  console.log(mentors);
  return (
    <div>
      <h1>Our wonderful mentors span across the world</h1>
    </div>
  );
};

export default MentorPublicPage;
