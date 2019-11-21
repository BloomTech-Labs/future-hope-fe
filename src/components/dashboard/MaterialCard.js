import React from "react"

//make training material Links pretty with react-tiny-link library
import { ReactTinyLink } from 'react-tiny-link';
import photosGhana from "../dashboard/randomImages";

const MaterialCard = props => {
  console.log(props.material)
  return (
      <div data-cy="trainingCard">
      <ReactTinyLink
      cardSize="large"
      showGraphic={true}
      maxLine={2}
      minLine={1}
      proxyUrl="https://cors-anywhere.herokuapp.com/"
      url={props.material.source}
      header={`Module ${props.index + 1}`}
      description="Ghanaian Food"
      defaultMedia={photosGhana}
      />
      <br/>
      </div>
    
  );
};

export default MaterialCard
