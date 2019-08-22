import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from './Button';
import Typography from './Typography';
import Container from '@material-ui/core/Container';
import { fade } from '@material-ui/core/styles/colorManipulator';
import backgroundImage from './images/Ghana_school_under_the_trees2.jpg'
import backgroundImage2 from './images/Ghana_school_boy.png'

const styles = theme => ({
  landingHero: {
    color: 'white',
    position: 'relative',
    display: 'flex',
    paddingTop: '64px',
    // height: '75vh'
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: '5vh',
    width: '60vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '1.5rem'
  },
  background: {
    background: `url(${backgroundImage})`,
    backgroundPosition: 'top',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
    backgroundPosition: '0px -100px'
  },
  // backgroundOverlay: {
  //   background: `url(${backgroundImage2})`,
  //   backgroundPosition: 'top',
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  //   backgroundSize: '850px auto',
  //   backgroundRepeat: 'no-repeat',
  //   zIndex: 1,
  //   backgroundPosition: '990px 71px'
  // },
  button: {
    minWidth: 200,
    backgroundColor: fade(theme.palette.primary.green, 0.65),
    color: '#ffff'
  },
  subTitle:{
    fontSize: '1rem',
    fontWeight: 800,
    letterSpacing: '.1rem',
    lineHeight: '1.4rem',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(4),
  },
  cta: {
    marginTop: theme.spacing(4),
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(1),
    },
  },
  heroText: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginLeft: '33vw',
  paddingTop: '5vh',
  zIndex: 1, 
  backgroundColor: '#00000082',
  width: '40vw',
  height: '65vmin'
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function LandingHero(props) {
  const { classes } = props;

  return (
    <section className={classes.landingHero}>
      <Container className={classes.container} maxWidth="md">
        {/* Helps background image load faster */}
        {/* <div className={classes.backgroundOverlay} /> */}
        <img style={{ display: 'none' }} src={backgroundImage} alt="" />
        <div className={classes.heroBox}>
          <div className={classes.heroText}>
            <Typography align="left" variant="span" marked="left" className={classes.subTitle}>
                You Can Make A Difference
            </Typography>
            <Typography color="inherit" align="center" variant="h2" className={classes.cta}>
              Well Written CTA Here.
            </Typography>
            <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
              Teacher or Mentor filler......
            </Typography>
            <Button
              variant="outlined"
              size="medium"
              className={classes.button}
              // component="a"
              href="/register"
            >
              Register
            </Button>
            <Typography variant="body2" color="inherit" className={classes.more}>
              or Learn More Below
            </Typography>
          </div>
        </div>
      
      <div className={clsx(classes.background)} />
      
      </Container>
    </section>

  );
}

LandingHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingHero);