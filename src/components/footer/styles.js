import { container, dangerColor } from "../shared/styles/sharedStyle";

const footerStyle = {
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  footer: {
    padding: "0.9375rem 0",
    paddingLeft: "12vw",
    textAlign: "center",
    display: "flex",
    zIndex: "2",
    position: "relative",
    bottom: "0",
    width: "100%"
  },
  a: {
    color: dangerColor,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  footerWhiteFont: {
    "&,&:hover,&:focus": {
      color: "#FFFFFF"
    }
  },
  container,
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  icon: {
    width: "18px",
    color: dangerColor,
    height: "18px",
    top: "3px"
  }
};
export default footerStyle;
