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

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    marginBottom: 20
  },
  media: {
    height: 140
  }
});

const MentorPublicPage = props => {
  const classes = useStyles();
  const mentors = props.mentorData;
  console.log(mentors);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
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
              image={mentors.photoUrl}
              title="profile picture"
            />
            <CardContent>
              <Typography gutterBottom variant="h3" align="left">
                {mentors.name}
              </Typography>
              <Typography
                gutterBottom
                color="textSecondary"
                variant="subtitle1"
                align="left"
              >
                Location: {mentors.city}
              </Typography>
              <Typography paragraph variant="h5" align="left">
                About Me: {mentors.about}
              </Typography>
              <Typography gutterBottom variant="h5" align="left">
                Skills: {mentors.skills}
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
