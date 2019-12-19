import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "../shared/components/GridContainer";
import GridItem from "../shared/components/GridItem";
import Button from "../shared/components/Button";
import Parallax from "./components/Parallax";
import { landingPageStyle } from "./styles";

// Sections for this page
import BenefitSection from "./components/BenefitSection";
import FeatureSection from "./components/FeatureSection";
import CTASection from "./components/CTASection";
import MobileSection from "./components/MobileSection";

//analytics
import { logPageView } from "../Analytics";

const LandingPage = props => {
  const { classes } = props;

  useEffect(() => {
    logPageView();
  }, []);

  return (
    <div className="landing-container">
      <Parallax image={require("./assets/bg4.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={8} md={6}>
              <h1 className={classes.title}>You Can Make A Difference</h1>
              <h4>
                Become a changemaker and start making an impact on the lives of
                Ghanaian and Nigerian students wishing to qualify for admission
                into secondary and vocational schools.
              </h4>
              <br />
              <Button color="warning" size="lg" href="/signup">
                SIGNUP
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        {/* Sections Container */}
        <div className={classes.container}>
          <BenefitSection />
          <FeatureSection />
          <CTASection />
          <MobileSection />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

LandingPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(landingPageStyle)(LandingPage);
