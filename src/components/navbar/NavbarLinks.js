/*eslint-disable*/
import React from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// core components
import Button from "../shared/components/Button";

import { navbarLinksStyle } from "./navbarStyle";

function NavbarLinks({ ...props }) {
  const { classes } = props;
  const links = props.config.links;
  return (
    <List className={classes.list}>
      {Object.entries(links).map(([key, value]) => {
        return (
          <Link 
            id={key} 
            className={classes.listItem}
            to={`${value.href}`}
          >
              <Button
                color="transparent"
                className={classes.navLink}
              >
                {value.text}
              </Button>
              </Link>
          )
    })}
    </List>
  );
}

export default withStyles(navbarLinksStyle)(NavbarLinks);