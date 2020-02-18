import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestore } from "../../config/fbConfig.js";
import Button from "@material-ui/core/Button";

// Material UI Components
// import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
// import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";

import SearchUsersModal from "./SearchUsersModal.js";
import Conversation from "./Conversation";
import SideBar from "../shared/components/Sidebar/SideBar.js";

//analytics
import { logPageView, event } from "../Analytics";

import "./Messaging.scss";

// const useStyles = makeStyles(theme => ({
//   paper: {
//     marginTop: theme.spacing(3),
//     marginBottom: theme.spacing(3),
//     marginLeft: "auto",
//     marginRight: "auto",
//     padding: theme.spacing(2),
//     display: "flex",
//     overflow: "auto",
//     flexDirection: "column",
//     width: "70%"
//   }
// }));

function Messaging(props) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState({});
  const [showModal, setShowModal] = useState(false);
  // const classes = useStyles();

  // Sets up listener for all conversations current user is involved in from firestore and sets state
  useEffect(() => {
    logPageView();
    if (!props.userInfo.uid) {
      return;
    } else {
      firestore
        .collection("conversations")
        .where("participantUIDs", "array-contains", props.userInfo.uid)
        // .onSnapshot(querySnapshot => {
        //   console.log('in useEffect()', querySnapshot)
        //   let conversations = [];
        //   querySnapshot.forEach(conversation => {
        //     conversations.push(conversation.data());
        //   });
        //   setConversations(conversations);
        // });
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
          let conversations = []

          snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data())
            conversations.push(doc.data())
          });
          setConversations(conversations)
        })

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userInfo]);

  // Toggles appearance of Search User Modal for new conversations
  const toggleModal = () => {
    event(
      "New-Search",
      "User searching for user to converse with",
      "Conversation"
    );
    setShowModal(!showModal);
  };

  // Creates a Conversation doc in firestore when starting a new conversation
  const createConversation = selectedUser => {
    event("New-Conversation", "User started new conversation", "Conversation");
    const { uid, fullName, photoUrl } = selectedUser;
    const conversation = {
      participantUIDs: [uid, props.userInfo.uid],
      participantNames: [fullName, props.userInfo.fullName],
      participantAvatars: [photoUrl, props.userInfo.photoUrl]
    };
    // creates new BLANK conversation doc, stores it into conversationRef
    const conversationRef = firestore.collection("conversations").doc();
    // adds uid of new doc to converstation obj
    conversation.uid = conversationRef.id;
    // sets new doc with conversation info
    conversationRef.set(conversation);
    firestore
      .collection("conversations")
      .where("participantUIDs", "array-contains", props.userInfo.uid)
      // .onSnapshot(querySnapshot => {
      //   console.log('in useEffect()', querySnapshot)
      //   let conversations = [];
      //   querySnapshot.forEach(conversation => {
      //     conversations.push(conversation.data());
      //   });
      //   setConversations(conversations);
      // });
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        let conversations = []

        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data())
          conversations.push(doc.data())
        });
        setConversations(conversations)
      })
  };

  return (
    <div className="messaging-wrapper">
      <SideBar />
      {/* <Paper className={classes.paper} elevation={20}> */}
      <div className="list-conversations-wrapper">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Conversations</Typography>
            <List>
              <Button
                variant="outlined"
                color="primary"
                onClick={e => toggleModal()}
              >
                <CreateIcon color="inherit" />
                Start a Conversation
              </Button>
              <SearchUsersModal
                toggleModal={toggleModal}
                showModal={showModal}
                userInfo={props.userInfo}
                createConversation={createConversation}
                setSelectedConversation={setSelectedConversation}
              />
              {/* Map over conversation props, pull out the info we want.
                  Map again to get the avatar, name, and uid that is not the current users
                  display the other person's info
              */}
              {conversations.map(conversation => {
                console.log(conversations)
                let avatar = "";
                let name = "";
                let uid = "";
                conversation.participantAvatars.forEach(participantAvatar => {
                  if (participantAvatar !== props.userInfo.photoUrl) {
                    avatar = participantAvatar;
                  }
                });
                conversation.participantNames.forEach(participantName => {
                  if (participantName !== props.userInfo.fullName) {
                    name = participantName;
                  }
                });
                uid = conversation.uid;
                // Creates list of all conversations on left that current user is involved in
                return (
                  <div
                    key={uid}
                    className="conversation-list-item"
                    onClick={e => {
                      setSelectedConversation({
                        ...conversation
                      });
                    }}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          src={
                            avatar ||
                            "https://firebasestorage.googleapis.com/v0/b/future-hope-school.appspot.com/o/users%2Fblank_user%2Fblank_user.png?alt=media&token=9a7ffce8-9fc6-40ef-9678-ad5cf6449eaa"
                          }
                          alt="User"
                        />
                      </ListItemAvatar>
                      <ListItemText primary={name} />
                    </ListItem>
                  </div>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </div>
      <Conversation
        selectedConversation={selectedConversation}
        userInfo={props.userInfo}
      />
      {/* </Paper> */}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userInfo: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Messaging);
