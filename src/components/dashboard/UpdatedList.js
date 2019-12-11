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
  const [anArray, setAnArray] = useState([])
  const [comparedArray, setComparedArray] = useState([])
  const classes = useStyles();

  useEffect(() => {
    async function tryTest() {
      const test = await firebase
        .firestore()
        .collection("training")
        .doc("food")
        .collection("modules")
        .get();

      test.docs.map(doc => {
      });
    }

    tryTest();


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

  // console.log("MATERIALS:", materials);


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

  const compare = ( array1, array2) => {
    const comparedArray = []

    for(let item1 of array1){
      if(array2.includes(item1)){
        comparedArray.push(item1)
      }
    }

    return console.log("comp", comparedArray)
  }


  const compareTrainingArrays = () => {
    const materialIDs = materials.map(material => {
      return material.id
    })

    console.log("MATERIALS:", materialIDs)

    const completedIDs = completedTraining[0] ? completedTraining[0].completedTrainingProgress : []

    console.log("ALL COMPLETED MATERIALS:", completedIDs)
    
    const comparedArray = []

    if(!!completedIDs.length) {
      for(let i = 0; i < completedIDs.length; i++) {
        if(materialIDs.includes(completedIDs[i])) {
          comparedArray.push(completedIDs[i])
        }
      }
    }

    console.log("COMPARED ARRAY:", comparedArray)

    // materialIDs.forEach((e1)=>completedIDs.forEach((e2)=>{
    //   if(e1 === e2){
    //     comparedArray.push(e1)
    //   }
    // }))
    
    return comparedArray
  }

  const trainingProgress = compareTrainingArrays().length
  
  return (
    <>
<div className="progressText">Training Completed: {trainingProgress}</div>
    <ProgressBar  completedTrainingNumber={trainingProgress / materials.length * 100} completedTraining={completedTraining.length}/>
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
              topic={props.match.params.topic}
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

//12-4-2019
//Button added to training tab
//style and functionality not completed
