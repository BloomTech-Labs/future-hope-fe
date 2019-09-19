import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "../../shared/components/GridContainer";
import GridItem from "../../shared/components/GridItem";
import InfoArea from "../../shared/components/InfoArea";

import { benefitStyle } from "../styles";

function BenefitSection(props) {
  const { classes } = props;
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Our approach to change is simple</h2>
          <br />
          <h5 className={classes.description}>
          We Are A Global Community Of Changemakers
          We aim to Create a level playing field in education in developing
          countries by providing supplemental, virtual mentors to underserved
          rural and urban-poor schools.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Item 1"
              description="Copy for info item."
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Item 2"
              description="Copy for info item-2."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Item 3"
              description="Copy for info item-3."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
            {/* <i className={classes.foo + " fab fa-foo"} /> */}
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
