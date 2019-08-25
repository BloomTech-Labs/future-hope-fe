import React from "react";
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingHero from "./components/LandingHero";
import LandingMission from "./components/LandingMission";
import LandingImpact from "./components/LandingImpact";
import LandingFooter from "./components/LandingFooter";
import theme from './mui/theme';
import './styles.scss';


const LandingPage = (props) => {
  return(
<React.Fragment>
    <div>Welcome to Future Hope School!</div>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <LandingHero {...props} />
        <LandingMission />
        <LandingImpact />
        <LandingFooter />
        {/* change above to AppFooter if we go with a universal footer bar */}
    </ThemeProvider>

    
  </React.Fragment>
  )
};

export default LandingPage;