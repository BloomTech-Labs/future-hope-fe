import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import MessageIcon from "@material-ui/icons/Message";
import PeopleIcon from "@material-ui/icons/People";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AssignmentIcon from "@material-ui/icons/Assignment";

export const mainListItems = (
  <div>
    <ListItem button >
      <ListItemIcon>
        <CalendarTodayIcon />
      </ListItemIcon>
      <ListItemText primary="Schedule" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Teacher or Mentors" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MessageIcon />
      </ListItemIcon>
      <ListItemText primary="Start a Conversation" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MessageIcon />
      </ListItemIcon>
      <ListItemText primary="FAQs" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset> Profile</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="View Profile" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Update Profile" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Other Button" />
    </ListItem>
  </div>
);
