import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "../mui/Typography";
import { fade } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  cta: {
    fontSize: ".8rem",
    padding: "1.2rem",
    color: "white",
    fontWeight: 700,
    letterSpacing: ".1rem",
    lineHeight: "1.4rem",
    textTransform: "uppercase",
    marginBottom: theme.spacing(3)
    //backgroundColor: fade(theme.palette.primary.purple, 0.85)
  },
  container: {
    marginTop: "-23px",
    marginLeft: "1rem",
    marginBottom: theme.spacing(5),
    // display: 'flex',
    position: "relative"
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5)
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  }
});

function LandingMission(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Grid spacing={2} className={classes.container}>
        <Grid item xs={2}>
          <Typography variant="h3" className={classes.cta}>
            Our approach to change is simple
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6">
            We Are A Global Community Of Changemakers
          </Typography>
          We aim to Create a level playing field in education in developing
          countries by providing supplemental, virtual mentors to underserved
          rural and urban-poor schools.
        </Grid>
      </Grid>
    </section>
  );
}

LandingMission.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingMission);
