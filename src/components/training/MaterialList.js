import React from "react";
//components
import MaterialCard from "./materialCard";
const MaterialList = () => {
  //May need state hook to save data
  return (
    <div className="material-list">
      <MaterialCard />
    </div>
  );
};
export default MaterialList;
