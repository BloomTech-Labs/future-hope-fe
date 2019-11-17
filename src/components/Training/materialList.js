import React from "react";
//components
import MaterialCard from "./materialCard.js";

import { useFirestore, firestoreConnect } from "react-redux-firebase";
import { userStore } from "../../actions/auth.js";
import { firestore } from "firebase";
import { compose } from 'redux';

import { connect } from "react-redux";

const MaterialList = (props) => {
  const dummyLinks = ["https://www.youtube.com/watch?v=wyHbiYngzsY","https://www.youtube.com/watch?v=Fbs5KUz_pe0","https://www.britannica.com/place/Ghana/Daily-life-and-social-customs", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"]

  console.log("material", props);
  const firebase = useFirestore;
  console.log("firebase", firebase);
  //May need state hook to save data
  return (
    <div className="material-list">
      {
        dummyLinks.map((links, index) => {
          return <MaterialCard link={links} index={index}/>
        })
      }
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