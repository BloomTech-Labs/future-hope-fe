import ReactGA from "react-ga";

//initialize google analytics
export const initGA = () => {
  ReactGA.initialize(
    [
      {
        trackingId: "UA-148510060-1",
        gaOptions: {
          name: "masterBranch"
        }
      },
      {
        trackingId: "UA-148510060-2",
        gaOptions: { name: "stagingBranch" }
      }
    ],
    { debug: true, alwaysSendToDefaultTracker: false }
  );
};

//log page view user is on
export const logPageView = () => {
  //will set the path name in GA dashboard based on path visited
  //will send info for the staging & master branch urls
  ReactGA.set({ page: window.location.pathname }, [
    "stagingBranch",
    "masterBranch"
  ]);
  ReactGA.pageview(window.location.pathname, ["stagingBranch", "masterBranch"]);
};

//this function can be used to track any event in the app =)
export const event = (category, action, label) => {
  console.log("GOOGLE ANALYTICS EVENT FIRED");
  ReactGA.event(
    {
      category: category,
      action: action,
      label: label
    },
    ["stagingBranch", "masterBranch"]
  );
};
