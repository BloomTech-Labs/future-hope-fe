import React, { useState, useEffect } from "react";
import firebase from "../../config/fbConfig";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Icon from "@material-ui/core/Icon";

//components
import UpdateCard from "./UpdatedCard.js";
import SideBar from "../shared/components/Sidebar/SideBar.js";

import photosGhana from "../dashboard/randomImages";

import "./Dashboard.css";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const UpdatedList = props => {
  const [materials, setMaterials] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(`training/${props.match.params.topic}/modules`)
      .onSnapshot(
        snapshot => {
          const trainingDocs = snapshot.docs.map(doc => {
            return {
              ...doc.data()
            };
          });
          setMaterials(trainingDocs);
        },
        error => {
          console.log(error);
        }
      );

    return () => {
      unsubscribe();
    };
  }, [props.match.params.topic]);

  return (
    <>
      <SideBar />

      <div className="material-list">
        <div className="add-button">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
          >
            {/* <Icon>add_circle </Icon> */}+ Add Material
          </Button>
        </div>
        {materials.map((material, index) => {
          return (
            <UpdateCard
              material={material}
              index={index}
              photos={
                photosGhana[Math.floor(Math.random() * photosGhana.length)]
              }
            />
          );
        })}
      </div>
    </>
  );
};

export default UpdatedList;
