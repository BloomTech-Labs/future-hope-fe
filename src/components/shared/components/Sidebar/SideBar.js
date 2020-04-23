import React, { useEffect } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleSidebar, toggleTraining } from "../../../../actions/sidebar"

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

import { SecondaryListItems } from "./sideBarItems.js";
import MainListItems from './sideBarItems.js'

import "../../../styles/SideBar.scss";

const drawerWidth = 245;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "fixed",
    top: "80px",
    left: 0,
    whiteSpace: "nowrap",
    width: drawerWidth,
    height: "81vh",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

const SideBar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true)

  //Updates drawer when sidebar global state changes
  useEffect(() => {
    setOpen(props.sidebar)
  }, [])

  //Handles drawer toggle
  const handleDrawerToggle = (e) => {
    props.toggleSidebar(!props.sidebar)
    setOpen(props.sidebar);
  };

  return (
    <div id="dashboardContainer">
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, props.sidebar && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerToggle}>
            {!props.sidebar ? (
              <ChevronLeftIcon style={{ color: "#ff9800" }} />
            ) : (
                <ChevronRightIcon style={{ color: "#ff9800" }} />
              )}
          </IconButton>
        </div>
        <Divider />
        <MainListItems userInfo={props.userInfo} />
        <Divider />
        {props.userInfo.userType === "admin" && (
          <SecondaryListItems userInfo={props.userInfo} />
        )}
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.firebase.profile,
    training: state.firebase.training,
    sidebar: state.toggle.sidebar
  };
};

export default withRouter(connect(mapStateToProps, { toggleSidebar, toggleTraining })(SideBar));
