import React from "react";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import MessageIcon from "@material-ui/icons/Message";
import PeopleIcon from "@material-ui/icons/People";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PersonIcon from "@material-ui/icons/Person";

export const MainListItems = () => {
  return (
    <List>
      <ListItem button component={NavLink} to={"/admin-dashboard"}>
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText primary="Schedule" />
      </ListItem>
      <ListItem button component={NavLink} to={"/approved-mentors"}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="View Mentors" />
      </ListItem>
      <ListItem button component={NavLink} to={"/approved-teachers"}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="View Teachers" />
      </ListItem>
      <ListItem button component={NavLink} to={"/messaging"}>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="Messaging" />
      </ListItem>
    </List>
  );
};

export const SecondaryListItems = props => {
  return (
    <List>
      <ListSubheader inset> Profile</ListSubheader>
      <ListItem button component={NavLink} to={"/update-profile"}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Update Profile" />
      </ListItem>
    </List>
  );
};
