import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../../../config/fbConfig";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import MessageIcon from "@material-ui/icons/Message";
import PeopleIcon from "@material-ui/icons/People";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SchoolIcon from "@material-ui/icons/School"
import AddIcon from '@material-ui/icons/Add';
import { Menu, MenuItem, MenuList } from '@material-ui/core';
import "./sidebar.css"



import TrainingTab from './TrainingTab';


export const MainListItems = props => {

    const [navItems, setNavItems] = useState([])

  return (
    
    <List>
      <ListItem button component={Link} to={"/dashboard"}>
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
      >
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
          <ListItemIcon>
            <PeopleIcon style={{ color: "#ff9800" }} />
          </ListItemIcon>
          <ListItemText primary="Teachers" />
        </ListItem>
      )}
      <ListItem button component={Link} to={"/messaging"}>
        <ListItemIcon>
          <MessageIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </ListItem>
      {/* <ListItem button>
        <ListItemIcon>
          <LiveHelpIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="FAQs" />
      </ListItem> */}
      <ListItem button component={Link} to={"/update_profile"}>
        <ListItemIcon>
          <AccountBoxIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="Update Profile" />
      </ListItem>

      {/* Training Tab */}
      <ListItem>
        <ListItemIcon>
          <SchoolIcon style={{ color: "#ff9800" }} />
        </ListItemIcon>
        <ListItemText primary="Training" />
        <TrainingTab />
      </ListItem>

    </List>
  );
};

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
    </List>
  );
};
