/*eslint-disable*/
import React from "react";
import { useSelector } from "react-redux";

// react components for routing our app without refresh
import { NavLink } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";

// core components
import Button from "../shared/components/Button";

import { navbarLinksStyle } from "./navbarStyle";

function NavbarLinks({ ...props }) {
  const { classes } = props;
  const links = props.config.links;
  
  const auth = useSelector(
    state => state.firebase.auth.isLoaded && !state.firebase.auth.isEmpty
  );

  const navLink = links => {
    if (auth) {
      return links.filter(link => link.auth === auth);
    } else {
      return links;
    }
  };

  return (
    <List className={classes.list}>
      {navLink(links).map(link => {
        return (
          <NavLink
            id={link.href}
            className={classes.listItem}
            to={`${link.href}`}
            key={link.href}
          >
            <Button color="transparent" className={classes.navLink}>
              {link.text}
            </Button>
          </NavLink>
        );
      })}
    </List>
  );
}

export default withStyles(navbarLinksStyle)(NavbarLinks);
