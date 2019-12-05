import React from "react"

//make training material Links pretty with react-tiny-link library
import { ReactTinyLink } from "react-tiny-link"
import photosGhana from "../dashboard/randomImages"

const MaterialCard = props => {
  const { source, title, description } = props.material

  const indexOfId = source.indexOf("=") + 1

  const videoId = source.slice(indexOfId)

  const material = () => {
    return source.includes("youtube") ? (
      <iframe
        title={title}
        width="33%"
        height="382"
        className="material"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameborder="0"
        allowfullscreen="1"
      ></iframe>
    ) : (
      <ReactTinyLink
        style={{ maxWidth: "640px" }}
        className="material"
        cardSize="large"
        width="33%"
        proxyUrl="https://cors-anywhere.herokuapp.com/"
        url={source}
        header={title}
        description={description}
        defaultMedia={props.photos}
      />
    )
  }
  return [material()]
}

export default MaterialCard
