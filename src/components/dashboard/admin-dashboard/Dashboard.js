import React from "react";
import { connect } from "react-redux";
import { firestore } from "../../../config/fbConfig.js";
import MentorTable from "./MentorTable.js";
import TeacherTable from "./TeacherTable.js";
import SampleTable from "./Table";
//styles
import clsx from "clsx";
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./styles";
import { mainListItems, secondaryListItems } from "./listItems";

class Dashboard extends React.Component {
  state = {
    users: [],
    userType: "",
    setOpen: true,
    open: true
  };

  componentDidMount = async () => {
    let userArray = [];
    const userRef = firestore.collection("users");
    const userList = await userRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // console.log(doc.data());
        userArray.push({
          approval: doc.data().awaitingApproval,
          name: doc.data().fullName,
          userType: doc.data().userType,
          city: doc.data().city,
          stateProvince: doc.data().stateProvince,
          uid: doc.data().uid
        });
      });
    });
    this.setState({
      users: userArray
    });
    //! This is the fix for the refreshing as an admin and not being able to get back to this component.
    //! This also fixes accounts that are not admins being able to access the admin-dash
    //! Only problem is, when you are a non-admin account and attempt access, it flashes the admin dash before redirecting.
    setTimeout(() => {
      if (this.props.userInfo.userType !== "admin") {
        this.props.history.push("/");
      }
    }, 0);
  };

  handleDrawerOpen = e => {
    e.preventDefault();
    this.setState({
      ...this.state.setOpen
    });
  };

  handleDrawerClose = e => {
    e.preventDefault();
    this.setState({
      ...this.state.setOpen,
      setOpen: !this.state.setOpen
    });
  };

  render() {
    const { classes } = this.props;

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <h1>Chart</h1>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <h1>Deposits</h1>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <SampleTable />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    userInfo: state.firebase.profile //need access to the users collection instead to check userType and render props in the tables
  };
};

export default connect(mapStateToProps)(withStyles(useStyles)(Dashboard));
