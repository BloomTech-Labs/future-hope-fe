import React, { useState, useEffect } from "react";
import firebase from "../../config/fbConfig";
//components
import UpdateCard from "./UpdatedCard.js";
import SideBar from "../shared/components/Sidebar/SideBar.js";

import photosGhana from "../dashboard/randomImages";

import "./Dashboard.css";

const UpdatedList = props => {
  const [materials, setMaterials] = useState([]);

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
