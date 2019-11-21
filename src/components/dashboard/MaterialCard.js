import React from "react"

//make training material Links pretty with react-tiny-link library
import { ReactTinyLink } from "react-tiny-link"
import photosGhana from "../dashboard/randomImages"

const MaterialCard = props => {
  return [
    <ReactTinyLink
      cardSize="large"
      showGraphic={true}
      maxLine={3}
      minLine={1}
      proxyUrl="https://cors-anywhere.herokuapp.com/"
      url={props.material.source}
      header={props.material.title}
      description={props.material.description}
      defaultMedia={props.photos}
    />,
    <br />
  ]
}

export default MaterialCard
