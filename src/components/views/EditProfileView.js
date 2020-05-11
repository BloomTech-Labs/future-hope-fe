import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { firestore, storage } from "../../config/fbConfig.js";
import { connect } from "react-redux";
import swal from "@sweetalert/with-react";
//styles
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "../styles/views_Profile.scss";
import SideBar from "../shared/components/Sidebar/SideBar.js";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(5),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    maxWidth: '800px',
    [theme.breakpoints.up("md")]: {
      margin: "0 auto",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(0),
      marginLeft: "15vw",
      width: "80%",
    },
    [theme.breakpoints.up("xs")]: {
      marginLeft: "17.4vw",
      width: "80%",
    },
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
  const [showPreview, setShowPreview] = useState(false);
  const classes = useStyles();

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

  const previewImage = () => {
    return URL.createObjectURL(img);
  };

  const closeImage = e => {
    e.preventDefault();
    setShowPreview(!showPreview);
  };

  const handleFocus = e => {
    e.target.select();
  };

  const inputOnChange = e => {
    setImg(e.target.files[0]);
  };

  const photoCameraClick = e => {
    e.preventDefault();
    if (img) {
      setShowPreview(!showPreview);
    }
  };

  return (
    <div className="main-content">
      <SideBar />
      <div className="view-profile-wrapper">
        <Paper className={classes.paper} elevation={20}>
          <form
            className="profile-form"
            onSubmit={e => {
              e.preventDefault();
              updateInfo();
            }}
          >
            <TextField
              className="profile-input"
              label="Full Name"
              type="text"
              name="fullName"
              onFocus={handleFocus}
              value={user.fullName}
              onChange={handleChanges}
            /><br />
            <TextField
              className="profile-input"
              label="State or Province"
              type="text"
              name="stateProvince"
              onFocus={handleFocus}
              value={user.stateProvince}
              onChange={handleChanges}
            /><br />
            <TextField
              className="profile-input"
              label="City"
              type="text"
              name="city"
              onFocus={handleFocus}
              value={user.city}
              onChange={handleChanges}
            /><br />
            <TextField
              className="profile-input"
              type="text"
              label="Country"
              name="country"
              onFocus={handleFocus}
              value={user.country}
              onChange={handleChanges}
            /><br />
            <TextField
              className="profile-input"
              label="Phone Number"
              type="text"
              name="phoneNumber"
              onFocus={handleFocus}
              value={user.phoneNumber}
              onChange={handleChanges}
            /><br />
            <TextField
              className="profile-input"
              label="Email"
              type="text"
              name="email"
              onFocus={handleFocus}
              value={user.email}
              onChange={handleChanges}
            /><br />
            <TextField
              className="profile-input"
              label="About Me"
              type="text"
              multiline
              name="aboutMe"
              value={user.aboutMe}
              onChange={handleChanges}
            /><br />
            <div className="upload-photo-wrapper">
              <Input type="file" id="img-upload" onChange={inputOnChange} />
              <label htmlFor="img-upload">
                <Button
                  className="profile-button-upload"
                  onClick={e => {
                    e.preventDefault();
                    uploadImage();
                  }}
                >
                  Upload
                </Button>
              </label>
              <PhotoCamera
                className="preview-icon"
                onClick={photoCameraClick}
                color={showPreview ? "secondary" : "primary"}
              />
            </div><br />
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
          <div className="profile-pic-wrapper">
            {showPreview ? (
              <img src={previewImage(img)} alt="" onClick={closeImage} />
            ) : null}
          </div>
        </Paper>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.firebase.profile
  };
};

export default withRouter(connect(mapStateToProps)(EditProfileView));
