import React from "react";
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

import { MainListItems, SecondaryListItems } from "./listItems.js";
import "./Dashboard.css";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  }
}));

const SideBar = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div id="dashboardContainer">
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <MainListItems />
        <Divider />
        <SecondaryListItems userInfo={props.userInfo} />
      </Drawer>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.firebase.profile
  };
};

export default withRouter(connect(mapStateToProps)(SideBar));

// <Button href="/approved-mentors">
// View approved Mentors
// </Button>

{
  /* <MDBContainer>
          <MDBRow id="dashboard-MDBRow">
            <div id="dashboard-row" className=" row justify-content-start">
              <MDBCol size="3" className="dashboard-sidemenu">
                <div className="dashboard-sidemenu-btns">
                  <Button id="dashboard-btns" href="#">
                    Schedule a Meeting
                  </Button>
                  <Button
                    id="dashboard-btns"
                    onClick={() =>
                      this.props.userInfo.userType === "mentor"
                        ? this.props.history.push("/approved-teachers")
                        : this.props.history.push("/approved-mentors")
                    }
                  >
                    View{" "}
                    {this.props.userInfo.userType === "mentor"
                      ? "Teachers"
                      : "Mentors"}
                  </Button>
                  <Button id="dashboard-btns">Start a Conversation</Button>
                </div>
              </MDBCol>
            </div>
          </MDBRow>
        </MDBContainer> */
}
