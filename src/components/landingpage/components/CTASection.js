import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "../../shared/components/GridContainer";
import GridItem from "../../shared/components/GridItem";
import Button from "../../shared/components/Button";

import { ctaStyle } from "../styles";

function CTASection(props) {
  const { classes } = props;

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Work with us</h2>
          <h4 className={classes.description}>
            Start helping build a better future now.
          </h4>
          <Button
            fullWidth
            color="primary"
            onClick={() => props.history.push("/signup")}
          >
            Sign up
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
