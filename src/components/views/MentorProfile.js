// import React from "react";
// import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
// import Button from "@material-ui/core/Button";

// class MentorProfile extends React.Component {
//   render() {
//     const { auth, userInfo } = this.props;
//     console.log("userInfo Here", userInfo);
//     if (!auth.uid) return <Redirect to="/" />;

//     return (
//       <div className="dashboardContainer">
//         <MDBContainer>
//           <MDBRow>
//             <div className="row justify-content-start">
//               <MDBCol size="3" className="dashboard-sidemenu">
//                 <div className="dashboard-profile-info">
//                   <img src="#" alt="profile photo" />
//                 </div>
//                 <div className="dashboard-sidemenu-btns">
//                   <Button>View all Teachers</Button>
//                   <Button>View all Mentors</Button>
//                   <Button href="/calendar">Schedule a Meeting</Button>
//                   <Button>Start a Conversation</Button>
//                 </div>
//               </MDBCol>
//             </div>
//             <MDBCol size="9">
//               <h1>{userInfo.fullName}</h1>
//               <h4>
//                 {userInfo.city}, {userInfo.country}
//               </h4>
//               <p> {userInfo.aboutMe} </p>
//               <Button>Contact {userInfo.fullName} </Button>
//               <div>
//                 <h2>Skills</h2>
//                 <ul>
//                   <li></li>
//                 </ul>
//               </div>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     auth: state.firebase.auth,
//     userInfo: state.firebase.profile
//   };
// };

// export default connect(mapStateToProps)(MentorProfile);

//DELETE SOOOOOON
