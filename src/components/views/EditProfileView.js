import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { firestore, storage } from "../../config/fbConfig.js";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
//styles
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "./Profile.scss";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

const EditProfileView = props => {
  // let imgInput = React.useRef(null);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    city: "",
    stateProvince: "",
    country: "",
    phoneNumber: "",
    aboutMe: "",
    photoUrl: ""
  });
  const [img, setImg] = useState(null);

  useEffect(() => {
    setUser({
      fullName: props.userInfo.fullName,
      email: props.userInfo.email,
      city: props.userInfo.city,
      stateProvince: props.userInfo.stateProvince,
      country: props.userInfo.country,
      phoneNumber: props.userInfo.phoneNumber,
      aboutMe: props.userInfo.aboutMe,
      photoUrl: props.userInfo.photoUrl
    });
  }, [props.userInfo]);

  const handleChanges = e => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const updateInfo = async () => {
    const uid = props.userInfo.uid;
    const userRef = firestore.collection("users").doc(uid);
    await userRef
      .update({
        email: user.email,
        fullName: user.fullName,
        city: user.city,
        stateProvince: user.stateProvince,
        country: user.country,
        phoneNumber: user.phoneNumber,
        aboutMe: user.aboutMe
      })
      .then(() => {
        swal(`Your information has been updated`, {
          icon: "success"
        });
      })
      .catch(() => {
        swal(
          "There was a server error, your information could not be updated",
          {
            icon: "warning"
          }
        );
      });
  };

  const uploadImage = e => {
    const { uid } = props.userInfo;
    if (img) {
      storage
        .ref()
        .child("users")
        .child(uid)
        .child(img.name)
        .put(img)
        .then(res => res.ref.getDownloadURL())
        .then(photoUrl => {
          firestore
            .collection("users")
            .doc(uid)
            .update({ photoUrl: photoUrl });
        })
        .catch(err => console.log(err));
    }
  };

  const handleFocus = e => {
    e.target.select();
  };

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paper} elevation={20}>
        <Grid container spacing={3}>
          <form
            className="profile-form"
            onSubmit={e => {
              e.preventDefault();
              updateInfo();
            }}
          >
            <Grid item xs={12}>
              <TextField
                className="profile-input"
                label="Full Name"
                type="text"
                name="fullName"
                onFocus={handleFocus}
                value={user.fullName}
                onChange={handleChanges}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="profile-input"
                label="State or Province"
                type="text"
                name="stateProvince"
                onFocus={handleFocus}
                value={user.stateProvince}
                onChange={handleChanges}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="profile-input"
                label="City"
                type="text"
                name="city"
                onFocus={handleFocus}
                value={user.city}
                onChange={handleChanges}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="profile-input"
                type="text"
                label="Country"
                name="country"
                onFocus={handleFocus}
                value={user.country}
                onChange={handleChanges}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="profile-input"
                label="Phone Number"
                type="text"
                name="phoneNumber"
                onFocus={handleFocus}
                value={user.phoneNumber}
                onChange={handleChanges}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="profile-input"
                label="Email"
                type="text"
                name="email"
                onFocus={handleFocus}
                value={user.email}
                onChange={handleChanges}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="profile-input"
                label="About Me"
                type="text"
                multiline
                name="aboutMe"
                value={user.aboutMe}
                onChange={handleChanges}
              />
            </Grid>
            <Input
              type="file"
              id="img-upload"
              onChange={e => setImg(e.target.files[0])}
            />
            <label htmlFor="img-upload">
              <Button
                className="profile-button-save"
                onClick={e => {
                  e.preventDefault();
                  uploadImage();
                }}
              >
                Upload
              </Button>
            </label>
            <Button
              className="profile-button-save"
              onClick={e => {
                e.preventDefault();
                updateInfo();
              }}
            >
              Save Changes
            </Button>
          </form>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.firebase.profile
  };
};

export default withRouter(connect(mapStateToProps)(EditProfileView));
