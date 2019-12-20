import React, { useState, useEffect } from "react";
import Sidebar from "../../shared/components/Sidebar/SideBar.js";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import { firestore } from "../../../config/fbConfig";

import PropTypes from "prop-types";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { makeStyles } from "@material-ui/core/styles";

const variantIcon = {
  success: CheckCircleIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

function MySnackbar(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbar.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success"]).isRequired
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

function EditMaterial(props) {
  const [editMaterial, setEdit] = useState({
    description: "",
    source: "",
    title: "",
    category: ""
  });
  const [categories, setCategory] = useState([]);

  const classes = useStyles2();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    let unsubscribe = firestore
      .collection("trainingTabNav")
      .onSnapshot(snapshot => {
        let trainingCategories = snapshot.docs.map(doc => {
          return doc.data().navName;
        });
        setCategory(trainingCategories);
      });

    setEdit({
      description: props.material.description || "",
      source: props.material.source || "",
      title: props.material.title || "",
      category: props.material.category || ""
    });
    return unsubscribe;
  }, []);

  let handleChange = e => {
    setEdit({ ...editMaterial, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await firestore
      .collection(`training/${editMaterial.category}/modules`)
      .doc(props.material.id)
      .update(editMaterial);
    setTimeout(() => {
      props.closeWindow();
    }, 1000);
  };

  return (
    <>
      <Sidebar />
      <div className="add-materials">
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={handleSubmit}>
                    <p className="h4 text-center">Edit Training Material</p>
                    <MDBInput
                      type="text"
                      label="heading"
                      value={editMaterial.title}
                      name="title"
                      icon="heading"
                      onChange={handleChange}
                      required
                    />
                    <MDBInput
                      type="text"
                      label="material description"
                      value={editMaterial.description}
                      name="description"
                      icon="align-justify"
                      onChange={handleChange}
                      required
                    />
                    <MDBInput
                      type="url"
                      label="enter a valid URL (https://www.example.com)"
                      value={editMaterial.source}
                      name="source"
                      icon="link"
                      onChange={handleChange}
                      required
                    />

                    <MDBBtn color="orange" type="submit" onClick={handleClick}>
                      Edit Material
                    </MDBBtn>
                    <Snackbar
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                      }}
                      open={open}
                      autoHideDuration={1000}
                      onClose={handleClose}
                    >
                      <MySnackbar
                        onClose={handleClose}
                        variant="success"
                        message="Material has been updated!"
                      />
                    </Snackbar>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
}

export default EditMaterial;
