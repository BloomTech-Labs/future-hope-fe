import React from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "../shared/components/GridContainer";
import GridItem from "../shared/components/GridItem";
import Card from "../shared/components/card/Card";
import CardBody from "../shared/components/card/CardBody";

import { featureStyle } from "./styles"

import img1 from "./assets/img-one.png";
import img2 from "./assets/img-two.png";
import img3 from "./assets/img-three.png";

function FeatureSection(props) {
  const { classes } = props;
  const imageClasses = classNames(
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Help us make an Impact.</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={img1} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                VOLUNTEER ON YOUR SCHEDULE
                <br />
                <small className={classes.smallTitle}>
                  Set your availability
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  You direct when and where you volunteer while helping to
                  enhance educational outlook for students to build a better
                  life.
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={img2} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                USE YOUR SKILLS FOR GOOD
                <br />
                <small className={classes.smallTitle}>
                  Connect with students that need your help
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Empower students with the knowledge that they need by using
                  your expertise to change thier lives.
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={img3} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                MAKE A REAL DIFFERENCE
                <br />
                <small className={classes.smallTitle}>
                  Help students thrive
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  As a changemaker, you will become a major influence in the
                  lives of students. You have the power to make a lasting
                  impact.
                </p>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {
  classes: PropTypes.object
};

export default withStyles(featureStyle)(FeatureSection);
