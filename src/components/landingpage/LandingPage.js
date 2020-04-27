import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "../shared/components/GridContainer";
import GridItem from "../shared/components/GridItem";
import Button from "../shared/components/Button";
import Parallax from "./Parallax";
import { landingPageStyle } from "./styles";

// Sections for this page
import BenefitSection from "./BenefitSection";
import FeatureSection from "./FeatureSection";
import CTASection from "./CTASection";
import MobileSection from "./MobileSection";

// css styles for description
import '../styles/LandPage_Extra.css';

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
                <h4 className="xDD">
                  Become a changemaker and start making an impact on the lives of
                  Ghanaian and Nigerian students wishing to qualify for admission
                  into secondary and vocational schools.
                </h4>
              <Button className={classes.label} fontSize="button" color="warning" size="lg" href="/signup">
                <span className={classes.label}>SIGN UP</span>
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
    </div >
  );
};

LandingPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(landingPageStyle)(LandingPage);
