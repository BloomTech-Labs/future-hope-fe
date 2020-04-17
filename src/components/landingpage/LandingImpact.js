import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from "./mui/Typography";
import { ReactComponent as StudentIcon } from './assets/student.svg';
import '../styles/landingpage_styles.scss';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'calc(100vh - 10rem)',
    overflow: 'visible'
  },
  impactLeft: {
    paddingTop: '2rem'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  impactHeader: {
    color: 'white',
    alignSelf: 'flex-start'
  },
  impactCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '2rem',
    paddingTop: '1rem',
    width: '14rem',
    minHeight: '17rem',
    backgroundColor: 'white',
    marginBottom: '1rem',
    color: 'white'
  },
  impactRight: {
    width: '70rem'
  },
  impactCard1: {
    backgroundColor: theme.palette.impactCards.first,
  },
  impactCard__2: {
    color: 'black',
    backgroundColor: theme.palette.impactCards.second,
  },
  impactCard3: {
    backgroundColor: theme.palette.impactCards.third,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  }
});

function LandingImpact(props) {
  const { classes } = props;

  return (
    <Container className={classes.root} maxWidth="xl" id="bgImg">
      <Grid item xs={12} className={classes.impactLeft}>
        <Typography className={classes.impactHeader} variant="h4">
          You Can Make An Impact
        </Typography>
      </Grid>
      <Grid
        container
        wrap="nowrap"
        justify="flex-start"
        alignItems="center"
        className={classes.impactRight}
      >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          className={classes.impactCardFirstGroup}
        >
          <Paper square={true} className={`${classes.impactCard} ${classes.impactCard1}`}>
            <Grid item className="cardIconWrapper">
              <StudentIcon className="cardIcon" />
            </Grid>
            <Grid container direction="column">
              <Typography className="cardTextHead" variant="h3" align="center" gutterBottom="true">49%</Typography>
              <Typography className="cardTextWrapper" variant="span" align="center">of Students Need Help</Typography>
            </Grid>
          </Paper>
          <Paper square={true} className={`${classes.impactCard} ${classes.impactCard__2}`}>
            <Grid item className="cardIconWrapper">
              <StudentIcon className="cardIcon" />
            </Grid>
            <Grid container direction="column">
              <Typography className="cardTextHead" color="black" variant="h3" align="center" gutterBottom="true">4</Typography>
              <Typography className="cardTextWrapper" variant="span" align="center">Hours a month to help students.</Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid>
          <Paper square={true} className={`${classes.impactCard} ${classes.impactCard3}`}>
            <Grid item className="cardIconWrapper">
              <StudentIcon className="cardIcon" />
            </Grid>
            <Grid container direction="column">
              <Typography className="cardTextHead" color="black" variant="h3" align="center" gutterBottom="true">91</Typography>
              <Typography className="cardTextWrapper" variant="span" align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

LandingImpact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingImpact);