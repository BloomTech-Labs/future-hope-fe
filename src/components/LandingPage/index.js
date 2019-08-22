import React from "react";
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingHero from "./LandingHero";
import LandingMission from "./LandingMission";
import LandingImpact from "./LandingImpact";
import theme from './theme';
import './styles.scss';


const LandingPage = (props) => {
  return(
<React.Fragment>
    <div>Welcome to Future Hope School!</div>
    {/* <AppAppBar /> */}
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <LandingHero {...props} />
        <LandingMission />
        <LandingImpact />
        <div>
          Filler Filler Filler Filler Filler
          Filler Filler Filler Filler Filler
          Filler Filler Filler Filler Filler
          Filler Filler Filler Filler Filler
        </div>
    </ThemeProvider>
    
    
    {/* <ProductCategories /> */}
    {/* <ProductHowItWorks /> */}
    {/* <ProductCTA /> */}
    {/* <ProductSmokingHero /> */}
    {/* <AppFooter /> */}
  </React.Fragment>
  )
};

export default LandingPage;