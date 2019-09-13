// import React, { Component } from "react";
// import { connect } from "react-redux";
// // import { firestoreConnect } from "react-redux-firebase";
// // import { compose } from "redux";
// import { Redirect } from "react-router-dom";
// import Loader from "react-loader-spinner";
// import SideBar from "../SideBar";
// import Calendar from "../../calendar/Calendar.js";
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

// import "../Dashboard.css";

// ////  Add collections to the const {} object and mSTP when you know what they are....

// class mentorDashboard extends Component {
//   render() {
//     const { auth } = this.props;
//     if (!auth.uid) {
//       return (
//         //! Joel removed the redirect due to a race condition problem on refreshes. We will need another way to redirect, or at least delay the check first
//         <Loader type="TailSpin" color="#e4be4d" height={100} width={100} />
//       );
//     }

//     return (
//       <div className="dashboardContainer">
//         <MDBContainer>
//           <MDBRow id="dashboard-MDBRow">
//             <div className="row justify-content-start">
//               <SideBar />
//             </div>
//             <MDBCol size="9">
//               <Calendar />
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     auth: state.firebase.auth
//   };
// };

// //! Commenting out code, this doesn't work with our firebase implementation
// // export default compose(
// //   connect(mapStateToProps),
// //   firestoreConnect([{ collection: "users" }])
// // )(mentorDashboard);

// export default connect(mapStateToProps)(mentorDashboard);
//NOT BEING USED ANYMORE
