import React from "react";
//components
import MaterialCard from "./MaterialCard";

import { firebaseConnect, useFirestore, useFirestoreConnect, firestoreConnect } from "react-redux-firebase";
import { userStore } from "../../actions/auth.js";
import { firestore } from "firebase";
import { compose } from 'redux';

import { connect } from "react-redux";

const MaterialList = (props) => {
  console.log("material", props);
  const firebase = useFirestore;
  console.log("firebase", firebase);
  //May need state hook to save data
  return (
    <div className="material-list">
      <MaterialCard />
    </div>
  );
};

// export default MaterialList;

const mapStateToProps = state => { 
  return {
    auth: state.firebase.auth,
    user: state.firebase.profile,
    training: state.firestore.training
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     userStore: user => dispatch(userStore(user))
//   };
// };

export default compose(
  firestoreConnect(() => ["training"]),
  connect(state => ({training: state.firestore.ordered.training}))
)(MaterialList);