/*eslint-disable*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { List, ListItem, withStyles } from "@material-ui/core";
import { useRouteMatch } from 'react-router-dom'

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import { footerStyle, mobileFooterStyle } from "./styles";

const Footer = ({ ...props }) => {
  const match = useRouteMatch().path
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="/contact" className={classes.block}>
                Contact
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/mission" className={classes.block}>
                Mission
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/privacy-policy" className={classes.block}>
                Privacy Policy
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} made with{" "}
          <Favorite className={classes.icon} /> by{" "}
          <a
            href="https://lambdaschool.com/"
            className={aClasses}
            target="_blank"
          >
            Lambda School
          </a>{" "}
          for a better web & better world.
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};


export default withStyles(window.screen.width >= 600 ? footerStyle : mobileFooterStyle)(Footer);
