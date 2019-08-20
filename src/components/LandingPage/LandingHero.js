import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from './Button';
import Typography from './Typography';
import LandingHeroLayout from './LandingHeroLayout';
import { green } from '@material-ui/core/colors';

const backgroundImage =
  'https://upload.wikimedia.org/wikipedia/commons/a/a2/Ghana_school_under_the_trees.jpg';

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9',
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
    backgroundColor: green[500],
    color: '#ffff'
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function LandingHero(props) {
  const { classes } = props;

  return (
    <LandingHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        You Can Make A Difference
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        Teacher or Mentor filler......
      </Typography>
      <Button
        // color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        // component="a"
        href="/register"
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </LandingHeroLayout>
  );
}

LandingHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingHero);