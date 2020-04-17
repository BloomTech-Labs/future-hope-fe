import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = theme => ({
  LandingFooter: {
    display: 'flex',
    height: '15vh'
  }
});

function LandingFooter(props) {
  const { classes } = props;

  return (
    <section className={classes.LandingFooter}>
      <Container className={classes.container}>
        <span>Footer Holder</span>
      </Container>
    </section>
  );
}

LandingFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingFooter);