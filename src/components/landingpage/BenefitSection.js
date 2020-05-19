import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import ForumIcon from "@material-ui/icons/Forum";

// core components
import GridContainer from "../shared/components/GridContainer";
import GridItem from "../shared/components/GridItem";
import InfoArea from "../shared/components/InfoArea";

import { benefitStyle } from "./styles";

function BenefitSection(props) {
  const { classes } = props;
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>You can make a difference.</h2>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Signup"
              description="Complete the signup form to join the waiting list"
              icon={ImportantDevicesIcon}
              iconColor="warning"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Get Approved"
              description="The school administrator will approve your account"
              icon={VerifiedUser}
              iconColor="warning"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Start connecting"
              description="Connect with other changemakers in the app"
              icon={ForumIcon}
              iconColor="warning"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
BenefitSection.propTypes = {
  classes: PropTypes.object
};

export default withStyles(benefitStyle)(BenefitSection);
