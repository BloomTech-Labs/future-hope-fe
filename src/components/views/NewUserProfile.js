import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { firestore } from "../../config/fbConfig.js";
import { connect } from "react-redux";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  profile: {
    border: "1px solid blue",
    textAlign: "center",
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto",
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
    textAlign: "center !important",
    border: "1px solid red"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-30px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  name: {
    marginTop: "50px",
    border: "1px solid yellow"
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
    marginTop: "100px",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    border: "1px solid green",
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
  console.log("props", props);
  const [user, setUser] = useState({});

  useEffect(() => {
    // grabs user UID from URL and searches users collection for a matching doc
    firestore
    .collection("users")
    .doc(props.match.params.uid)
    .get()
    .then(querySnapshot => {
      setUser(querySnapshot.data())
    });
  }, []);

  const classes = useStyles();

  if (!props.userInfo.uid && props.userInfo.awaitingApproval) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        {console.log(user)}
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <Container justify="center">
                  <div  className={classes.profile}>
                    <div>
                      <img
                        src={user.photoUrl}
                        alt="please upload profile photo"
                        className={classNames(
                          classes.imgRounded,
                          classes.imgFluid,
                          classes.imgRoundedCircle
                        )}
                      />
                    </div>
                    <div className={classes.name}>
                      <h3 className={classes.title}>{user.fullName}</h3>
                      <h6>I am a {user.userType}</h6>
                    </div>
                  </div>
              </Container>
              <div className={classes.description}>
                <p>About Me:  {user.aboutMe}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    userInfo: state.firebase.profile
  };
};

export default connect(mapStateToProps)(NewUserProfile);
