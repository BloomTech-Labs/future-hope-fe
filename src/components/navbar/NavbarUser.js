/*eslint-disable*/
import React, { useState } from "react";

// react components for routing our app without refresh
import { Link } from "react-router-dom";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

// core components
import { auth } from "../../config/fbConfig.js";
import { navbarLinksStyle } from "./navbarStyle";

const NavbarUser = props => {
  const { classes, user } = props;
  const [anchorEl, setAnchorEl] = useState({});
  const [open, setOpen] = useState(false);
  const hoverColor = "success";

  function logout() {
    console.log("logged out");
    auth.signOut();
    props.history.push("/");
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  }

  function handleClose() {
    setAnchorEl({});
    setOpen(!open);
  }

  const dropdownItem = classNames({
    [classes.dropdownItem]: true,
    [classes[hoverColor + "Hover"]]: true
    // [classes.noLiPadding]: noLiPadding,
    // [classes.dropdownItemRTL]: rtlActive
  });

  return (
    <div>
      <Avatar
        alt={user.fullName}
        src={user.photoUrl}
        className={classes.bigAvatar}
        aria-haspopup="true"
        onClick={handleClick}
      />
      <div>
        <Popper
          open={open}
          anchorEl={anchorEl}
          transition
          disablePortal
          placement="bottom"
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Grow in={open} id="menu-list" style={{ transformOrigin: "0 0 0" }}>
              <Paper className={classes.dropdown}>
                <MenuList role="menu" className={classes.menuList}>
                  <MenuItem className={classes.dropdownHeader}>
                    {user.fullName}
                  </MenuItem>
                  <MenuItem
                    className={dropdownItem}
                    onClick={e => props.history.push("/update_profile")}
                  >
                    Profile
                  </MenuItem>
                  {/* Select Menu Items when clicking on user Avatar */}
                  <MenuItem className={dropdownItem} onClick={logout}>
                    <Link to="/login">Logout</Link>
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </div>
      {/* <span className={classes.userName}>{user.displayName}</span> */}
    </div>
  );
};

export default withStyles(navbarLinksStyle)(NavbarUser);
