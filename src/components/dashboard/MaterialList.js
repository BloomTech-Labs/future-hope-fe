import React, { useState, useEffect } from "react"
import firebase from "../../config/fbConfig"
//components
import MaterialCard from "./MaterialCard"
// Internal Components
import SideBar from "../shared/components/Sidebar/SideBar.js"

import "./Dashboard.css"
const MaterialList = props => {
  console.log("Props", props)
  //May need state hook to save data
  const [materials, setMaterials] = useState([])
  useEffect(() => {
    console.log("MATCH: ", props.match.params.topic)
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

  console.log(materials)
  return (
    <>
      <SideBar />
      <div
        className="material-list"
        style={{ display: "flex", justifyContent: "center", margin: "0 auto" }}
      >
        {materials.map(material => {
          return <MaterialCard material={material} />
        })}
      </div>
    </>
  )
}
export default MaterialList
