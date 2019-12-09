import React, { useState, useEffect } from "react"
import firebase from "../../config/fbConfig"
//components
import MaterialCard from "./MaterialCard"
// Internal Components
import SideBar from "../shared/components/Sidebar/SideBar.js"
import ProgressBar from './ProgressBar'

import photosGhana from "../dashboard/randomImages";


import "./Dashboard.css"
const MaterialList = props => {
  //May need state hook to save data
  const [materials, setMaterials] = useState([])
  const [completedTraining, setCompletedTraining] = useState([])
  useEffect(() => {
    const unsubsribe = firebase
      .firestore()
      .collection(`training/${props.match.params.topic}/modules`)
      .onSnapshot(
        snapshot => {
          const trainingDocs = snapshot.docs.map(doc => {
            return {
              ...doc.data()
            }
          })
          setMaterials(trainingDocs)
        },
        error => {
          console.log(error)
        }
      )

    return () => {
      unsubsribe()
    }
  }, [props.match.params.topic])

  useEffect(() => {
    const unsubscribe = firebase
    .firestore()
    .collection(`users/${localStorage.getItem("UID")}/completedTraining`)
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
  })

  console.log(completedTraining)

  return (
    <>
    <div className="progressText">Training Completed: {completedTraining.length}</div>
    <ProgressBar  completedTrainingNumber={completedTraining.length/100} completedTrainin={completedTraining.length}/>
      <SideBar/>
      <div className="material-list" >
        {materials.map((material, index) => {
          return <MaterialCard material={material} index={index} photos={photosGhana[Math.floor(Math.random() * photosGhana.length)]} />
        })}
      </div>

    </>
  )
}
export default MaterialList
