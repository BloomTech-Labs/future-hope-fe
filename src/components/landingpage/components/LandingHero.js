import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../mui/Button";
import Typography from "../mui/Typography";
import { fade } from "@material-ui/core/styles/colorManipulator";
import backgroundImage from "../assets/Ghana_school.jpg";

const styles = theme => ({
  landingHero: {
    color: "white",
    position: "relative",
    display: "flex",
    minHeight: "75vh"
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: "5vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  background: {
    background: `url(${backgroundImage})`,
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: -2,
    backgroundPosition: "0px -100px",
    transform: "scaleX(-1)"
  },
  button: {
    minWidth: 200,
    backgroundColor: fade(theme.palette.primary.purple, 0.95),
    color: "#ffff"
  },
  subTitle: {
    fontSize: "1rem",
    fontWeight: 800,
    letterSpacing: ".1rem",
    lineHeight: "1.4rem",
    textTransform: "uppercase",
    marginBottom: theme.spacing(4)
  },
  cta: {
    marginTop: theme.spacing(4)
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1)
    }
  },
  heroBox: {
    position: "absolute",
    top: "15vh",
    left: "50vw",
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.9)",
    height: "50vh",
    padding: "16px"
  },
  heroText: {
    display: "flex",
    color: "black",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "5vh",
    zIndex: 1,
    width: "40vw",
    height: "65vmin"
  },
  more: {
    marginTop: theme.spacing(2)
  }
});

function LandingHero(props) {
  const { classes } = props;

  return (
    <section className={classes.landingHero}>
      <div className={classes.container} xl>
        {/* Helps background image load faster */}
        <img style={{ display: "none" }} src={backgroundImage} alt="background img" />

        <div className={classes.heroBox}>
          <div className={classes.heroText}>
            <Typography
              align="left"
              variant="span"
              marked="left"
              className={classes.subTitle}
            >
              You Can Make A Difference
            </Typography>
            <Typography
              color="inherit"
              align="center"
              variant="h2"
              className={classes.cta}
            >
              Well Written CTA Here.
            </Typography>
            <Typography
              color="inherit"
              align="center"
              variant="h5"
              className={classes.h5}
            >
              Teacher or Mentor filler......
            </Typography>
            <Button
              variant="outlined"
              size="medium"
              className={classes.button}
              href="/register"
            >
              Register
            </Button>
            <Typography
              variant="body2"
              color="inherit"
              className={classes.more}
            >
              or Learn More Below
            </Typography>
          </div>
        </div>
        <div className={classes.background} />
      </div>
    </section>
  );
}

LandingHero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingHero);
