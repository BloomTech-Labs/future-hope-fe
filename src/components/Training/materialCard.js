import React from "react";
import { makeStyles } from "@material-ui/core/styles";

//make training material Links pretty with react-tiny-link library
import { ReactTinyLink } from 'react-tiny-link';
import photosGhana from "./randomImages.js"

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

const MaterialCard = props => {
  
  return (

    <div>
      <ReactTinyLink
      cardSize="large"
      showGraphic={true}
      maxLine={2}
      minLine={1}
      proxyUrl="https://cors-anywhere.herokuapp.com/"
      url={props.link}
      header={`Module ${props.index + 1}`}
      description="Ghanaian Food"
      defaultMedia={photosGhana}
      />
      <br/>
    </div>
  );
};
export default MaterialCard;

// const mapStateToProps = state => {
//     return {
//       auth: state.firebase.auth,
//       user: state.firebase.profile
//     };
//   };
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       userStore: user => dispatch(userStore(user))
//     };
//   };
  
//   export default connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(MaterialCard);