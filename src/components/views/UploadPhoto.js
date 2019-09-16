import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Videocam from "@material-ui/icons/Videocam";

const styles = theme => ({
  input: {
    display: "none"
  }
});

class UploadPhoto extends React.Component {
  state = {
    images: [],
    videos: []
  };

  handleCapture = ({ target }) => {
    const fileReader = new FileReader();
    const name = target.accept.includes("image") ? "images" : "videos";

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = e => {
      this.setState(prevState => ({
        [name]: [...prevState[name], e.target.result]
      }));
    };
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-photo"
          onChange={this.handleCapture}
          type="file"
        />
        <label htmlFor="icon-button-photo">
          <IconButton color="primary" component="span">
            <PhotoCamera />
          </IconButton>
        </label>

        <input
          accept="video/*"
          capture="camcorder"
          className={classes.input}
          id="icon-button-video"
          onChange={this.handleCapture}
          type="file"
        />
        <label htmlFor="icon-button-video">
          <IconButton color="primary" component="span">
            <Videocam />
          </IconButton>
        </label>
      </Fragment>
    );
  }
}

export default UploadPhoto;
