import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import Button from "@material-ui/core/Button";
// core components
import GridContainer from "../shared/components/GridContainer";
import GridItem from "../shared/components/GridItem";
import Button from "../shared/components/Button";

import { ctaStyle } from "./styles";

function CTASection(props) {
  const { classes } = props;

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Ready to be a changemaker?</h2>
          <Button fontSize="button" fullWidth color="warning" size="lg" href="/signup">
            <span className={classes.label}>JOIN US</span>
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}

CTASection.propTypes = {
  classes: PropTypes.object
};

export default withStyles(ctaStyle)(CTASection);
