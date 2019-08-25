import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// hard coded a width because of image resizing weirdness
// probably a better way to handle this, but not a huge
// priority as or right now.
const useStyles = makeStyles({
  card: {
    width: "400px",
    margin: "32px auto"
  },
  media: {
    height: 160
  }
});

const MentorPublicPage = props => {
  const classes = useStyles();
  const mentors = props.mentorData;

  //grid is flexbox in material UI
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      display="flex"
      alignItems="center"
      justify="center"
    >
      <Grid>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="profile picture"
              className={classes.media}
              image={mentors.photoUrl || "https://source.unsplash.com/random"}
              title="profile picture"
            />
            <CardContent>
              <Typography gutterBottom variant="h3" align="left">
                {mentors.fullName}
              </Typography>
              <Typography
                gutterBottom
                color="textSecondary"
                variant="subtitle1"
                align="left"
              >
                Location: {mentors.stateProvince}
              </Typography>
              <Typography paragraph variant="h5" align="left">
                About Me: {mentors.aboutMe}
              </Typography>
              <Typography gutterBottom variant="h5" align="left">
                Skills:{" "}
                {mentors.skills ||
                  "Being happy! :) (this is placehodler because we arent inputting this data yet)"}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button href="#" size="small" color="secondary">
              Contact {mentors.name}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MentorPublicPage;
