import React from "react";
import PropTypes from "prop-types";

import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "../../shared/components/GridContainer";
import GridItem from "../../shared/components/GridItem";
import Card from "../../shared/components/card/Card";
import CardBody from "../../shared/components/card/CardBody";

import { featureStyle } from "../styles";

import img1 from "../assets/img-holder.png";
import img2 from "../assets/img-holder.png";
import img3 from "../assets/img-holder.png";

function FeatureSection(props) {
  const { classes } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>You can be a Changemaker</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={img1} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Feature 1
                <br />
                <small className={classes.smallTitle}>Feature 1 Sub</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your value
                  propositions. You can give more details about what they are.
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
                Feature 2
                <br />
                <small className={classes.smallTitle}>Feature 2 Sub</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your value
                  propositions. You can give more details about what they are.
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
                Feature 3
                <br />
                <small className={classes.smallTitle}>Feature 3 Sub</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your value
                  propositions. You can give more details about what they are.
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
