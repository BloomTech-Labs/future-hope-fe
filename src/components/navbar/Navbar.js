import React, { useState, useLayoutEffect, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";

// @material-ui/icons
import Menu from "@material-ui/icons/Menu";

// core components
import navConfig from "./navConfig";
import NavbarLinks from "./NavbarLinks";
import NavbarUser from "./NavbarUser";
import { navbarStyle } from "./navbarStyle";

const Navbar = props => {
  /*  Initial Navbar Config
    Get path from router => get config based on pathname.
    There is probably a cleaner way to implement this with
    the update function below so there is only 1 function.
    Anyone feel free to help :-D */
  const initConfig = () => {
    return !navConfig[route] ? navConfig["default"] : navConfig[route];
  };

  const auth = useSelector(state => state.firebase.profile);
  //* Holds current route for conditional navbar rendering
  const [route, setRoute] = useState(props.history.location.pathname);
  //* Holds current navbar config based on route
  const [config, setConfig] = useState(() => initConfig());

  //Router pathname listener
  //Detect change in route and run configUpdate function.
  //Gets default config if no match found.
  useLayoutEffect(() => {
    const configUpdate = () => {
      const path = props.history.location.pathname;
      !navConfig[path]
        ? setConfig(navConfig["default"])
        : setConfig(navConfig[path]);
    };
    if (props.history.location.pathname !== route) {
      const newRoute = props.history.location.pathname;
      setRoute(newRoute);
      configUpdate();
    }
  }, [props.history.location, route]);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //Handler for header color change.
  // Settings in config file
  const headerColorChange = () => {
    const { classes } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > config.changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[config.color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[config.changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[config.color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[config.changeColorOnScroll.color]);
    }
  };
  useLayoutEffect(() => {
    if (config.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return () => {
      window.removeEventListener("scroll", headerColorChange);
    };
  }, [config.changeColorOnScroll]);

  const { classes } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[config.color]]: config.color,
    [classes.fixed]: "fixed"
  });

  // Navbar Sections (brand/right/left/user)
  const brandComponent = (
    <Link to="/">
      <Button className={classes.title}>{config.brand}</Button>
    </Link>
  );
  const rightLinks = <NavbarLinks config={config} />;
  const leftLinks = null;
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        {leftLinks !== undefined ? brandComponent : null}
        <div className={classes.flex}>
          {leftLinks !== undefined ? (
            <Hidden smDown implementation="css">
              {leftLinks}
            </Hidden>
          ) : (
            brandComponent
          )}
        </div>
        {/* Loads links to the left of avatar depending on login state, setup in navConfig auth flag */}
        <Hidden smDown implementation="css">
          {config ? rightLinks : ""}
        </Hidden>
        {/* Avatar button that loads after signin */}
        <Hidden smDown implementation="css">
          {auth.isLoaded && auth.isEmpty ? (
            ""
          ) : (
            <NavbarUser user={auth} history={props.history} />
          )}
        </Hidden>
        {/* Hidden hamburger menu available on mobile widths */}
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {rightLinks}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
};

Navbar.defaultProp = {
  color: "white"
};

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(navbarStyle)(Navbar));
