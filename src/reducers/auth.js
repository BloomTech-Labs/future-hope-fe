import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER_INFO_SUCCESS,
  GET_UESR_INFO_FAIL
} from "../actions/auth";

const initialState = {
  authError: null,
  user: {
    aboutMe: '',
    city: '',
    country: '',
    email: '',
    fullName: '',
    phoneNumber: '',
    photoUrl: '',
    stateProvince: '',
    uid: '',
    userType: '',
    usersAwaitingApproval: null
  },
  getUserInfoError: null
};

//! Just basic scaffolding, what to do with the payload?
export const authReducer = (state = initialState, action) => {
  // console.log("signupReducer", action);
  switch (action.type) {
    case SIGNUP_START:
      return {
        ...state,
        authError: null
      };
    case SIGNUP_SUCCESS:
      console.log("signup success");
      return {
        ...state,
        authError: null
      };
    case SIGNUP_FAIL:
      console.log("signup fail");
      return {
        ...state,
        authError: action.err.message
      };
    case LOGIN_START:
      return {
        ...state,
        authError: null
      };
    case LOGIN_SUCCESS:
      console.log("login success!");
      return {
        ...state,
        authError: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        authError: action.err.message
      };
    case GET_USER_INFO_SUCCESS:
      console.log('getuserinfo success');
      return{
        ...state,
        user: {
          aboutMe: action.userInfo.aboutMe,
          city: action.userInfo.city,
          country: action.userInfo.country,
          email: action.userInfo.email,
          fullName: action.userInfo.fullName,
          phoneNumber: action.userInfo.phoneNumber,
          photoUrl: action.userInfo.photoUrl,
          stateProvince: action.userInfo.stateProvince,
          uid: action.userInfo.uid,
          userType: action.userInfo.userType,
          usersAwaitingApproval: action.userInfo.usersAwaitingApproval
        } ,
        getUserInfoError: null
      }
    case GET_UESR_INFO_FAIL:
      console.log('getuserinfo failed');
      return {
        ...state,
        getUserInfoError: action.message
      }
    default:
      return {
        ...state
      };
  }
};

export default authReducer;
