import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import { firestore } from "../../config/fbConfig.js";
import { connect } from "react-redux";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../shared/components/Button";
import Paper from "@material-ui/core/Paper";
import SideBar from "../shared/components/Sidebar/SideBar";
import "./views.css";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: theme.spacing(5)
  },
  profile: {
    textAlign: "center",
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto",
    "& img": {
      marginTop: "20px",
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto"
    }
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    fontWeight: "400",
    color: "#3C4858",
    textAlign: "center !important"
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
    marginTop: "50px"
  },
  title: {
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "700",
    fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    display: "inline-block",
    position: "relative",
    marginTop: "20px",
    minHeight: "32px"
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
    paddingLeft: "45px",
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
      maxWidth: "1140"
    }
  }
}));

const NewUserProfile = props => {
  //console.log("props", props);
  const [user, setUser] = useState({});

  useEffect(() => {
    // grabs user UID from URL and searches users collection for a matching doc
    firestore
      .collection("users")
      .doc(props.match.params.uid)
      .get()
      .then(querySnapshot => {
        setUser(querySnapshot.data());
      });
  }, [props.match.params.uid]);

  const classes = useStyles();

  if (!props.userInfo.uid && props.userInfo.awaitingApproval) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <SideBar />
        <div className={classes.container}>
          <Paper
            className={classNames(
              classes.main,
              classes.mainRaised,
              classes.paper
            )}
          >
            <div className={classes.profile}>
              <div>
                <img
                  src={
                    user.photoUrl ||
                    "https://firebasestorage.googleapis.com/v0/b/future-hope-school.appspot.com/o/users%2Fblank_user%2Fblank_user.png?alt=media&token=9a7ffce8-9fc6-40ef-9678-ad5cf6449eaa"
                  }
                  alt="profile"
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
            <div className={classes.description}>
              <p>{user.aboutMe}</p>
              <p>
                I am located in {user.city}, {""} {user.stateProvince}{" "}
                {user.country} and I am so excited to meet you!
              </p>
              <Button
                onClick={() => props.history.push("/messaging")}
                variant="contained"
                color="warning"
              >
                Contact Me
              </Button>
            </div>
          </Paper>
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

export default withRouter(connect(mapStateToProps)(NewUserProfile));
