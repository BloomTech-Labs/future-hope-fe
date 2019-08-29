import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
// import Footer from "../components/footer/Footer";
import GridContainer from "../shared/components/GridContainer";
import GridItem from "../shared/components/GridItem";
import Button from "../shared/components/Button";
import Parallax from "./components/Parallax";

import { landingPageStyle } from "./styles";

// Sections for this page
import BenefitSection from "./components/BenefitSection";
import FeatureSection from "./components/FeatureSection";
import CTASection from "./components/CTASection";

const LandingPage = (props) => {
    const { classes, ...rest } = props;
    return (
      <div>
        <Parallax image={require("./assets/bg4.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={8} md={6}>
                <h1 className={classes.title}>You Can Make A Difference</h1>
                <h4>
                  Ghanaian and Nigerian students wishing to qualify for admission
                  into secondary and vocational schools must take the Basic 
                  Education Certificate Examination (BECE).  Students who work 
                  with mentors in preperation for the exam had a higher pass rate
                  than those who did not.
                </h4>
                <br />
                <Button
                  color="warning"
                  size="lg"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register
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
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
}

LandingPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(landingPageStyle)(LandingPage);
