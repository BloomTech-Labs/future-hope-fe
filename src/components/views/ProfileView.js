import React from 'react';
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";



import {
    MDBContainer
  } from "mdbreact";



const ProfileView = (props) => {
    
    
    
    return (
       
            <MDBContainer className = 'profile-container' fluid>
                <div className = 'w-25 pr-5'>
                    <img src = {props.userInfo.photoUrl} alt = 'profile' className = 'img-fluid rounded float-left z-depth-1-half' />
                </div>
                <div className = 'info-container'>
                    <p className = 'left-aligned'>Name: {props.userInfo.fullName}</p>
                    <p className = 'left-aligned'>Location:{props.userInfo.city}, {props.userInfo.country}</p>

                    <p className = 'left-aligned' >About me: {props.userInfo.aboutMe}</p>
                    <p className = 'left-aligned'>Account Type: {props.userInfo.userType}</p>
                    <Button
                        size = 'small'
                        color = 'primary'
                        variant = 'contained'
                    >
                        Contact {props.userInfo.fullName}
                    </Button>
                </div>
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