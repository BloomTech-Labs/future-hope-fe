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
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

export const MainListItems = props => {
  return (
    <List>
      <ListItem
        button
        component={NavLink}
        to={
          props.userInfo.userType === "mentor"
            ? "/mentor_dashboard"
            : props.userInfo.userType === "teacher"
            ? "/teacher_dashboard"
            : "/admin-dashboard"
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
            props.userInfo.userType === "mentor" ? "Teachers" : "Mentors"
          }
        />
      </ListItem>
      {props.userInfo.userType === "admin" && (
        <ListItem button component={NavLink} to={"/approved-teachers"}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='Teachers' />
        </ListItem>
      )}
      <ListItem button component={NavLink} to={"/messaging"}>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary='Messages' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LiveHelpIcon />
        </ListItemIcon>
        <ListItemText primary='FAQs' />
      </ListItem>
      <ListItem button component={NavLink} to={"/update_profile"}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary='Update Profile' />
      </ListItem>
    </List>
  );
};

export const SecondaryListItems = props => {
  return (
    <List>
      <ListSubheader inset>Admin</ListSubheader>
      <ListItem button component={NavLink} to={"/user-approval"}>
        <ListItemIcon>
          <VerifiedUserIcon />
        </ListItemIcon>
        <ListItemText primary='Approve Users' />
      </ListItem>
    </List>
  );
};
