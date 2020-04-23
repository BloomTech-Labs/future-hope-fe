import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { firestore } from "../../../../config/fbConfig"
import swal from "sweetalert"

import { connect } from 'react-redux'
import { toggleSidebar, toggleTraining } from '../../../../actions/sidebar'

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import MessageIcon from "@material-ui/icons/Message"
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import PeopleIcon from "@material-ui/icons/People"
import CalendarTodayIcon from "@material-ui/icons/CalendarToday"
import AccountBoxIcon from "@material-ui/icons/AccountBox"
import LiveHelpIcon from "@material-ui/icons/LiveHelp"
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser"
import SchoolIcon from "@material-ui/icons/School"
import AddIcon from '@material-ui/icons/Add';
import { Menu, MenuItem, MenuList } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import "../../../styles/sidebar.css"

import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import TrainingTab from "./TrainingTab"

const MainListItems = props => {
  const [navItems, setNavItems] = useState([])
  const [newCat, setNewCat] = useState({})

  useEffect(() => {
    customLinks()
  }, [])

  const customLinks = async () => {
    let linkArray = []
    const linkRef = firestore.collection("trainingTabNav")
    await linkRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        linkArray.push({
          name: doc.data().navName
        })
      })
    })
    setNavItems(linkArray)
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  //Handles training drawer toggle
  const handleDrawerOpen = (e) => {
    props.toggleTraining(!props.training)
    setOpen(props.training)
  };

  //Updates drawer if training global state changes
  useEffect(() => {
    setOpen(props.training)
  }, [props.training])

  return (
    <List>
      <ListItem button component={Link} to={"/dashboard"}>
        {/* Link to dashboard */}
        <ListItemIcon>
          <CalendarTodayIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="Schedule" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to={
          props.userInfo.userType === "mentor"
            ? "/approved-teachers"
            : "/approved-mentors"
        }
      >{/* Link to Mentors */}
        <ListItemIcon>
          <PeopleIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>

        <ListItemText
          primary={
            props.userInfo.userType === "mentor" ? "Teachers" : "Mentors"
          }
        />
      </ListItem>
      {props.userInfo.userType === "admin" && (
        <ListItem button component={Link} to={"/approved-teachers"}>
          {/* Link to teachers */}
          <ListItemIcon>
            <SchoolIcon style={{ color: "#ff9800" }} />
          </ListItemIcon>
          <ListItemText primary="Teachers" />
        </ListItem>
      )}
      {props.userInfo.userType === "admin" && (
        <ListItem button component={Link} to={"/approved-admins"}>
          {/* Link to admins */}
          <ListItemIcon>
            <AccountTreeIcon style={{ color: "#ff9800" }} />
          </ListItemIcon>
          <ListItemText primary="Admins" />
        </ListItem>
      )}
      <ListItem button component={Link} to={"/messaging"}>
        {/* Link to messaging */}
        <ListItemIcon>
          <MessageIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </ListItem>

      <ListItem button component={Link} to={"/update_profile"}>
        {/* Link to  */}
        <ListItemIcon>
          <AccountBoxIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="Update Profile" />
      </ListItem>

      {/* Training Pulldown to list */}
      <ListItem button onClick={handleDrawerOpen}>
        <ListItemIcon>
          <LibraryAddCheckIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="Training" />
        {open ? < ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <TrainingTab />
          </ListItem>
        </List>
      </Collapse>

    </List>
  )
}

const mapStateToProps = state => {
  return {
    sidebar: state.toggle.sidebar,
    training: state.toggle.training
  }
}

export default connect(mapStateToProps, { toggleSidebar, toggleTraining })(MainListItems);

export const SecondaryListItems = props => {
  return (
    <List>
      <ListSubheader inset>Admin</ListSubheader>
      <ListItem button component={Link} to={"/user-approval"}>
        <ListItemIcon>
          <VerifiedUserIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="Approve Users" />
      </ListItem>
      <ListItem button component={Link} to={"/add-materials"}>
        <ListItemIcon>
          <AddBoxIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="Add Materials" />
      </ListItem>
    </List>
  )
}
