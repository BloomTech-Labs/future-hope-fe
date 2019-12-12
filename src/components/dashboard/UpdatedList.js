import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import firebase from "../../config/fbConfig";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Icon from "@material-ui/core/Icon";

//components
import UpdateCard from "./UpdatedCard.js";
import SideBar from "../shared/components/Sidebar/SideBar.js";
import ProgressBar from './ProgressBar'

import photosGhana from "../dashboard/randomImages";

import "./Dashboard.css";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const UpdatedList = props => {
  const [materials, setMaterials] = useState([]);
  const [completedTraining, setCompletedTraining] = useState([])
  const classes = useStyles();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(`training/${props.match.params.topic}/modules`)
      .onSnapshot(
        snapshot => {
          const trainingDocs = snapshot.docs.map(doc => {
            return {
              id: doc.id,
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


  useEffect(() => {
    const unsubscribe = firebase
    .firestore()
    .collection(`users`).where("uid", "==", JSON.parse(localStorage.getItem("UID")))
    .onSnapshot(
      snapshot => {
        const completedTrainingDocs = snapshot.docs.map(doc => {
          return {
            ...doc.data()
          }
        })
        setCompletedTraining(completedTrainingDocs)
      },
      error => {
        console.log(error)
      }
    )
    return () => {
      unsubscribe()
    }
  }, [])

  const compareTrainingArrays = () => {
    // category's list of training material ids
    const materialIDs = materials.map(material => {
      return material.id
    })

    // user's list of completed training materials
    const completedIDs = completedTraining[0] ? completedTraining[0].completedTrainingProgress : []
    
    const comparedArray = []

    // getting list of training materials ids completed for the category
    if(!!completedIDs.length) {
      for(let id of completedIDs) {
        if(materialIDs.includes(id)) {
          comparedArray.push(id)
        }
      }
    }
    
    return comparedArray
  }

  const trainingProgress = compareTrainingArrays().length

  const progressPercentage = trainingProgress / materials.length * 100
  
  return (
    <>
<div className="progressText">Training Completed: {String(progressPercentage) + "%"}</div>
    <ProgressBar  completedTrainingNumber={progressPercentage} completedTraining={completedTraining.length}/>
      <SideBar />
      <div className="add-button">
        <Link to="/add-materials">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
          >
            {/* <Icon>add_circle </Icon> */}+ Add Material
          </Button>
        </Link>
      </div>
      <div className="material-list">
        {materials.map((material, index) => {
          return (
            <UpdateCard
              key={index}
              topic={props.match.params.topic}
              material={material}
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

//12-4-2019
//Button added to training tab
//style and functionality not completed
