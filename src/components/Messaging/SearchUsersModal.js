import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBFormInline,
  MDBIcon
} from "mdbreact";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import "../styles/Messaging.scss";

import { firestore } from "../../config/fbConfig.js";
import blank_user from "../../assets/img/blank_user.png";

const SearchUsersModal = props => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchArray, setSearchArray] = useState([]);

  const searchParticipants = async searchTerm => {
    const arr = []
    const arr2 = []
    const usersRef = await firestore.collection("users");
    await usersRef
      .get()
      .then(snapshot => {
        snapshot.Pm.docChanges.map(userSnap => {
          const user = userSnap.doc.proto.fields.fullName.stringValue
          if (user.toLowerCase().includes(`${searchTerm.toLowerCase()}`)) {
            arr.push(user)
          }
        })
      })
    const search = async (name) => {
      const usersRefTwo = await firestore.collection("users");
      await usersRefTwo
        .where("fullName", "==", name)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            arr2.push(doc.data());
            setSearchArray(arr2)
          });
        });
    }
    await arr.forEach(name => {
      search(name)
    })
    setSearchResults(searchArray);
    setSearchTerm("");
  };

  useEffect(() => {
    setSearchResults([{ fullName: "Loading..." }])
    setTimeout(() => {
      setSearchResults(searchArray);
    }, 500)
  }, [searchArray])

  return (
    <MDBContainer>
      <MDBModal className="modal-md" isOpen={props.showModal} toggle={props.toggleModal} centered>
        <MDBModalHeader
          toggle={e => {
            setSearchTerm("");
            setSearchResults({});
            props.toggleModal();
          }}
        >
          {`Search for Mentors Teachers & Admins`}
        </MDBModalHeader>
        <MDBModalBody>
          <MDBFormInline
            className="md-form"
            onSubmit={async e => {
              e.preventDefault();
              await searchParticipants(searchTerm);
            }}
          >
            <input
              className="form-control form-control-sm w-75"
              type="text"
              placeholder={`Search`}
              aria-label={`Search`}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <MDBBtn
              color="primary"
              size="sm"
              onClick={async e => {
                e.preventDefault();
                await searchParticipants(searchTerm);
              }}
            >
              <MDBIcon icon="search" />
            </MDBBtn>
          </MDBFormInline>
          {searchResults.length > 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">
                  {`Select`}
                </Typography>
                <List>
                  {searchResults.map(user => {
                    return (
                      <ListItem
                        onClick={e => {
                          props.createConversation(user);
                          props.setSelectedConversation(user);
                          props.toggleModal();
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar src={user.photoUrl || blank_user} />
                        </ListItemAvatar>
                        <ListItemText primary={user.fullName} />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          )}
        </MDBModalBody>
        <MDBModalFooter>

          <MDBBtn size="lg"
            color="secondary"
            onClick={e => {
              setSearchTerm("");
              setSearchResults([]);
              props.toggleModal();
            }}
          >
            <span className="aButton">
              Close
            </span>
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default SearchUsersModal;
