import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import LandingHero from "./LandingHero";
import theme from "./theme";

const LandingPage = props => {
  return (
    <React.Fragment>
      {/* <AppAppBar /> */}
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <LandingHero />
      </ThemeProvider>

      {/* <ProductValues />
    <ProductCategories />
    <ProductHowItWorks />
    <ProductCTA />
    <ProductSmokingHero />
    <AppFooter /> */}
    </React.Fragment>
  );
};

export default LandingPage;
