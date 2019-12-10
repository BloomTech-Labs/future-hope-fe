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
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import { firestore } from "../../../config/fbConfig";

import PropTypes from "prop-types";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { green, red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';

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

function AddMaterial(props) {
  const [newMaterial, setNew] = useState({
    description: "",
    source: "",
    title: "",
    category: ""
  });

  const [newCategory, setCat] = useState({
    category: ""
  });

  const [validateCat, setValCat] = useState(false);

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
    return unsubscribe;
  }, []);

  let handleChange = e => {
    if(e.target.name === 'category') {
      setValCat(false)
    }
    setNew({ ...newMaterial, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if(!newMaterial.category) {
        setValCat(true)
        console.log("cat: ", newMaterial.category)
      } else {
        console.log("cat: ", newMaterial.category)
        const newDoc = await firestore
        .collection('training').doc(newMaterial.category.toLowerCase()).collection('modules').add(newMaterial);
      
      setNew({ description: "", source: "", title: "", category: "" });
      setValCat(false)
      }
  };

// add category
  useEffect(()=> {
    firestore
    .collection("trainingTabNav")
  },[])

  let handleCategoryChange = e => {
    setCat({ ...newCategory, [e.target.name]: e.target.value });
  };

    const handleCategorySubmit = async e => {
      e.preventDefault();

        const newCat = await firestore
        .collection(`training`).doc(newCategory.category.toLowerCase()).set({})
        
        //updates categories in side nav
        await firestore.collection('trainingTabNav').add({
          navName: newCategory.category
        })
    }
   

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
                    <p className="h4 text-center">
                      Enter Information for New Training Material
                    </p>
                    <MDBInput
                      type="text"
                      label="heading"
                      value={newMaterial.title}
                      name="title"
                      icon="heading"
                      onChange={handleChange}
                      required
                    />
                    <MDBInput
                      type="text"
                      label="material description"
                      value={newMaterial.description}
                      name="description"
                      icon="align-justify"
                      onChange={handleChange}
                      required

                    />
                    <MDBInput
                      type="text"
                      label="enter a valid URL (https://www.example.com)"
                      value={newMaterial.source}
                      name="source"
                      icon="link"
                      onChange={handleChange}
                      required

                    />
                    <MDBDropdown>
                      <MDBDropdownToggle caret color="primary">
                        Select or Add New Category
                      </MDBDropdownToggle>
                      {<p style={{color: 'red', display: validateCat ? "block" : "none"}}>*Please select a category</p>}
                      <MDBDropdownMenu basic name="category">
                        {categories.map(cat => (
                          <MDBDropdownItem
                            name="category"
                            value={cat.toLowerCase()}
                            onClick={handleChange}
                          >
                            {cat}
                          </MDBDropdownItem>
                        ))}
                        <MDBDropdownItem divider />
                        {/* add new category input as dropdown item */}
                        <div className='add-category'>
                          <MDBInput type="text" 
                          label="enter new category" 
                          value={newCategory.category}
                          name="category" 
                          onChange={handleCategoryChange}></MDBInput>
                          <button type="submit" onClick={handleCategorySubmit}><AddIcon/></button>
                        </div>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                    <MDBBtn color="orange" type="submit" onClick={handleClick}>
                      Add Materials
                    </MDBBtn>
                    <Snackbar
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                      }}
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                    >
                      <MySnackbar
                        onClose={handleClose}
                        variant="success"
                        message="New material has been added!"
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

export default AddMaterial;
