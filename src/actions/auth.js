export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_UESR_INFO_FAIL = "GET_UESR_INFO_FAIL";

// Sign up
//! This is no longer being used. We set the info inside of signup.js, and store it using the aciton userStore below.
// export const signUp = user => {
//   return (dispatch, getState, { getFirebase, getFirestore }) => {
//     // dispatch({ type: SIGNUP_START });
//     const firebase = getFirebase();
//     const firestore = getFirestore();

//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(user.email, user.password)
//       .then(res => {
//         return firestore
//           .collection("usersAwaitingApproval")
//           .doc(res.user.uid)
//           .set({
//             fullName: user.fullName,
//             email: user.email,
//             userType: user.userType,
//             locationInfo: {
//               city: user.city,
//               stateProvince: user.stateProvince,
//               country: user.country
//             },
//             phoneNumber: user.phoneNumber,
//             aboutMe: user.aboutMe
//           });
//       })
//       .then(() => {
//         dispatch({ type: SIGNUP_SUCCESS });
//       })
//       .catch(err => {
//         dispatch({ type: SIGNUP_FAIL, err });
//       });
//   };
// };

// Login

//! This isn't being used either. userStore is taking care of all login/signup actions.
// export const login = creds => {
//   return (dispatch, getState, { getFirebase }) => {
//     const firebase = getFirebase();
    
//     console.log("inside login action");
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(creds.email, creds.password)
//       .then(() => {
//         dispatch({ type: LOGIN_SUCCESS });
//       })
//       .catch(err => {
//         dispatch({ type: LOGIN_FAIL, err });
//       });
//   };
// };

//store user info into redux
export const userStore = user => {
  //if user exists, then continue. If they don't then log in didn't work.
  if(user){
  return (dispatch, getState, { getFirebase,  getFirestore  }) => {
    
    const firestore = getFirestore();
    let userInfo = null;
    console.log('inside userStore action');
    //search firestore for the doc with current uid
    firestore
      .collection("users")
      .doc(`${user.uid}`)
      .onSnapshot(snapshot => {
        console.log(snapshot, 'snapshot userStore');
        userInfo = snapshot.data();
        console.log(userInfo, 'userinfo')
        //dispatches the userInfo to redux store
        //if snapshot was successfull, send success and userInfo to redux
        if (snapshot){
           dispatch({ type: GET_USER_INFO_SUCCESS,  userInfo });
        } else {
          dispatch({ type: GET_UESR_INFO_FAIL, message: 'Unable to Get User Data' });
        }
    })
      
      
  }
} else {
  return (dispatch) => {
    dispatch({ type: GET_UESR_INFO_FAIL, message: 'Unable to Get User Data'  });
  }
}
}


