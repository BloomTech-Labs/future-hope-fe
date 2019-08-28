import React from 'react';
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
// import Calendar from '../calendar/Calendar.js';



import {
    MDBContainer
  } from "mdbreact";



const ProfileView = (props) => {
    
    
    
    return (
       
            <MDBContainer className = 'profile-container d-flex' fluid>
                <div className = 'w-25 pr-3'>
                    <img src = {props.userInfo.photoUrl} alt = 'profile' className = 'img-fluid rounded float-left z-depth-1-half' />
                </div>
                <div className = 'info-container'>
                    <h4 className = 'left-aligned font-weight-bold p-2'>{props.userInfo.fullName}</h4>
                    <p className = 'left-aligned font-weight-light p-2'>Location: {props.userInfo.city}, {props.userInfo.country}</p>

                    <p className = 'left-aligned p-2' >About me: {props.userInfo.aboutMe}</p>
                    <p className = 'left-aligned p-2'>Account Type: {props.userInfo.userType}</p>
                    <Button
                        size = 'small'
                        color = 'primary'
                        variant = 'contained'
                    >
                        Contact {props.userInfo.fullName}
                    </Button>
                </div>
                {/* <Calendar /> */}
        </MDBContainer>
     
       
    )
}


//* This state.firebase.profile gives us all the profile info automatically stored into redux by firebase. Neat.
const mapStateToProps = (state) => {
    return{
        userInfo: state.firebase.profile
    }
}

export default connect(mapStateToProps)(ProfileView);