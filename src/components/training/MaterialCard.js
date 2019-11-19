import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import image from "../../assets/img/old_ghana_picture.png";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

const MaterialCard = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
        //   image={image}
          title="Old Picture of Ghana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title || "Ghana"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description || "Learn more about Ghana from this page"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          <a href="https://www.everyculture.com/Ge-It/Ghana.html">Learn More</a>
        </Button>
      </CardActions>
    </Card>
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