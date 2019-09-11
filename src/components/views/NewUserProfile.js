import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { firestore } from "../../config/fbConfig.js";
import { connect } from "react-redux";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
// import Header from "components/Header/Header.js";
// import Footer from "components/Footer/Footer.js";
// import Button from "components/CustomButtons/Button.js";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { QuerySnapshot } from "@google-cloud/firestore";
// import Parallax from "components/Parallax/Parallax.js";

const useStyles = makeStyles(theme => ({
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)"
    }
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  name: {
    marginTop: "-80px"
  },
  title: {
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "700",
    fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  imgFluid: {
    maxWidth: "100%",
    height: "auto"
  },
  imgRounded: {
    borderRadius: "6px !important"
  },
  imgRoundedCircle: {
    borderRadius: "50% !important"
  },
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    "@media (min-width: 576px)": {
      maxWidth: "540px"
    },
    "@media (min-width: 768px)": {
      maxWidth: "720px"
    },
    "@media (min-width: 992px)": {
      maxWidth: "960px"
    },
    "@media (min-width: 1200px)": {
      maxWidth: "1140px"
    }
  }
}));

const NewUserProfile = props => {
  console.log(props);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    profilePage();
  }, []);
  const profilePage = async () => {
    let userArray = [];
    //profile needs to render info based on the uid in the url
    //make a call to the firestore searching by the uid
    const userRef = firestore.collection("users").doc(this.state.profile_id);
    //using that info, make a get call and store that in userInfo
    await userRef.get().then(QuerySnapshot => {
      QuerySnapshot.forEach(doc => {
        userArray.push({
          profile_photoUrl: doc.data().photoUrl,
          profile_fullName: doc.data().fullName,
          profile_city: doc.data().city,
          profile_stateProvince: doc.data().stateProvince,
          profile_country: doc.data().country,
          profile_aboutMe: doc.data().aboutMe,
          profile_userType: doc.data().userType,
          uid: doc.data().uid
        });
      });
    });
    // console.log(userRef, 'userRef');
    // console.log(userInfo, 'userInfo');
    // console.log(userInfo.data(), '.data');
    //userInfo.data has all the info we want. store that in a variable for ease of use
    // const profileInfo = userInfo.data(); //stores all the info we want from the db
    // console.log(profileInfo, 'profileInfo');

    //set state with the db info
    setUsers(userArray);
  };

  const classes = useStyles();

  if (!this.props.userInfo.uid && this.props.userInfo.awitingApproval)
    return <Redirect to="/" />;
  return (
    <div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <Container justify="center">
              <Grid xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={this.state.profile_photoUrl}
                      alt="..."
                      className={classes.imgRounded}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>
                      {this.state.profile_fullName}
                    </h3>
                    <h6>{this.state.profile_userType}</h6>
                  </div>
                </div>
              </Grid>
            </Container>
            <div className={classes.description}>
              <p>{this.state.profile_aboutMe} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.firebase.profile
  };
};

export default connect(mapStateToProps)(NewUserProfile);
