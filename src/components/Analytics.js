import ReactGA from "react-ga";

//initialize google analytics
export const initGA = () => {
  console.log("GOOGLE ANALYTICS");
  //initialization of GA with ID
  ReactGA.initialize("UA-148510060-1");
  //staging branch GA id
  ReactGA.initialize("UA-148510060-2");
};

//log page view user is on
export const logPageView = () => {
  console.log("GOOGLE ANALYTICS PAGE VIEW");
  //will set the path name in GA dashboard based on path visited
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

//this function can be used to track any event in the app =)
export const event = (category, action, label) => {
  console.log("GOOGLE ANALYTICS EVENT FIRED");
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};
