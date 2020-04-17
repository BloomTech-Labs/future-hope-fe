import React from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "../shared/components/GridContainer";
import GridItem from "../shared/components/GridItem";
import Card from "../shared/components/card/Card";

import { mobileStyle } from "./styles";

import img4 from "./assets/img-mobile-two.png";

function MobileSection(props) {
  const { classes } = props;
  const imageClasses = classNames(
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Coming Soon to the App Store.</h2>
      <div>
        <GridContainer>
          <GridItem>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={img4} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                If you have an iPhone, you will soon be able to manage your
                schedule whenever you want via our iOS app.
                <br />
              </h4>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

MobileSection.propTypes = {
  classes: PropTypes.object
};

export default withStyles(mobileStyle)(MobileSection);
