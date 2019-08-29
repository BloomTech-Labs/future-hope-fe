import React from "react";
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
  const [checked, setChecked] = React.useState([1]);

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
          {/* <List dense className={classes.root}>
                {[0, 1, 2, 3].map(value => {
                  const labelId = `checkbox-list-secondary-label-${value}`;
                  return ( */}
          <h1>Rendered Component Bitchezzzzzz!</h1>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color='secondary' onClick={e => props.toggleSearchModal()}>
            Close
          </MDBBtn>
          <MDBBtn color='primary'>Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    //   <ListItem key={value} button>
    //     <ListItemAvatar>
    //       <Avatar
    //         alt={`Avatar n°${value + 1}`}
    //         src={`/static/images/avatar/${value + 1}.jpg`}
    //       />
    //     </ListItemAvatar>
    //     <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
    //     <ListItemSecondaryAction>
    //       <Checkbox
    //         edge="end"
    //         onChange={handleToggle(value)}
    //         checked={checked.indexOf(value) !== -1}
    //         inputProps={{ 'aria-labelledby': labelId }}
    //       />
    //     </ListItemSecondaryAction>
    //   </ListItem>
    //       );
    //     })}
    //   </List>
  );
}
