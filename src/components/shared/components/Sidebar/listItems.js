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
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

export const MainListItems = props => {
  return (
    <List>
      <ListItem
        button
        component={NavLink}
        to={
          props.userInfo.userType === "mentor"
            ? "/mentor_dashboard"
            : "/teacher_dashboard"
        }
      >
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText primary='Schedule' />
      </ListItem>

      <ListItem
        button
        component={NavLink}
        to={
          props.userInfo.userType === "mentor"
            ? "/approved-teachers"
            : "/approved-mentors"
        }
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>

        <ListItemText
          primary={
            props.userInfo.userType === "mentor"
              ? "View Teachers"
              : "View Mentors"
          }
        />
      </ListItem>
      <ListItem button component={NavLink} to={"/messaging"}>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary='Messaging' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LiveHelpIcon />
        </ListItemIcon>
        <ListItemText primary='FAQs' />
      </ListItem>
    </List>
  );
};

export const SecondaryListItems = props => {
  return (
    <List>
      <ListSubheader inset> Profile</ListSubheader>
      <ListItem button component={NavLink} to={"/update_profile"}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary='Update Profile' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary='Other Button' />
      </ListItem>
    </List>
  );
};
