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
  const [progressCompleted, setProgressCompleted] = useState([])
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
        // console.log("TEST:", doc.data());
      });
    }

    tryTest();

    // console.log("PROPS", props);

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
    // .get()
    // .then(query => {
    //   query.docs.forEach(user => {
    //     user.data()
    //   },
    //   console.log(query))
    // })
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

  const completedTrainingNumber = () => {
    if(completedTraining[0]){
    return completedTraining[0].completedTrainingProgress.length / materials.length * 100
    }
  }

  console.log(completedTraining)




  const compare = ( array1, array2) => {
    const comparedArray = []

    // for(let item1 of array1){
    //   for(let item2 of array2){
    //     if(item1 == item2){
    //       comparedArray.push(item2)
    //     }
    //   }
    // }

    for(let item1 of array1){
      if(array2.includes(item1)){
        comparedArray.push(item1)
      }
    }
  }

   const testArr = ["asdfsdaf", "asdfasdfa", "adfahgsd", "4123412"]
  // const onClickHandler = (m) => {
  //   testArr.push(m.id)
  //   console.log("testArr", testArr)
  // }

  return (
    <>
<div className="progressText">Training Completed: {completedTraining[0] && completedTraining[0].completedTrainingProgress.length}</div>
    <ProgressBar  completedTrainingNumber={completedTrainingNumber()} completedTraining={completedTraining.length}/>
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
              filteredTrainingProgress={testArr}
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
