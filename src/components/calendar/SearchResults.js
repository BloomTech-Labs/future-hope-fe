import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBFormInline,
  MDBIcon
} from "mdbreact";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SearchResults(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    setSearchResults(props.searchResults);
  });

  const saveParticipants = () => {
    let invitedUsers = [];
    checked.forEach(index => invitedUsers.push(searchResults[index]));
    console.log(invitedUsers);
    props.setParticipants(invitedUsers);
  };

  return (
    <MDBContainer>
      <MDBModal
        isOpen={props.showSearchResults}
        toggle={props.toggleSearchModal}
        centered
      >
        <MDBModalHeader toggle={props.toggleSearchModal}>
          Select Participants
        </MDBModalHeader>
        <MDBModalBody>
          <List dense className={classes.root}>
            {searchResults.map((user, index) => {
              const labelId = `checkbox-list-secondary-label-${index}`;
              return (
                <ListItem key={index} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${index + 1}`}
                      src={
                        user.photoUrl ||
                        "http://wedaward.com/imagecache/box360/avatar/2028/blank_user.png"
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={user.fullName}
                    secondary={user.email}
                  />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge='end'
                      onChange={handleToggle(index)}
                      checked={checked.indexOf(index) !== -1}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color='secondary' onClick={e => props.toggleSearchModal()}>
            Close
          </MDBBtn>
          <MDBBtn
            color='primary'
            onClick={e => {
              saveParticipants();
              props.toggleSearchModal();
            }}
          >
            Save participants
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
}
