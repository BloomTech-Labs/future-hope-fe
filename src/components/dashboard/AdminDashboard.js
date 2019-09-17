// import React, { Component } from "react";
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
// import { connect } from "react-redux";
// import { firestoreConnect } from "react-redux-firebase";
// import { compose } from "redux";
// import { auth } from "firebase-admin";
// import { Redirect } from "react-router-dom";

// //  My zoom is sucking

// class AdminDashboard extends Component {
//   render() {
//     const {} = this.props;
//     if (!auth.uid) return <Redirect to="/" />;

//     return (
//       <div className="dashboardContainer">
//         <MDBContainer>
//           <MDBRow>
//             <MDBCol md="3">
//               <p>Hello World</p>
//             </MDBCol>
//             <MDBCol md="9">
//               <p>Hello World</p>
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

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect([{ collection: "users" }])
// )(AdminDashboard);
// NOT USING THIS