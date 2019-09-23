import ReactGA from "react-ga";

//initialize google analytics
export const initGA = () => {
  console.log("GOOGLE ANALYTICS");
  //initialization of GA with ID
  ReactGA.initialize("UA-148510060-1");
};

//log page view user is on
export const logPageView = () => {
  //will set the path name in GA dashboard based on path visited
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
