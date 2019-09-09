import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase, { firestore } from "firebase";

import ListConversations from "./ListConversations.js";
import Messages from "./Conversation";
import SideBar from "../dashboard/SideBar.js";

function Messaging(props) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const conversationsRef = firestore
      .collection("conversations")
      .where("participantUIDs", "array-contains", state.firebase.profile.uid);
  }, []);

  //Create the message, add it to firestore
  const createMessage = message => {
    return firebase
      .firestore()
      .collections("conversations")
      .add({
        content: message.content,
        sentBy: message.sentBy,
        timestamp: message.timestamp
      })
      .catch(() => {
        console.log("Error occured in creating message.");
      });
  };

  return (
    <div className='messages-wrapper'>
      <SideBar />
      <ListConversations />
      <Conversation />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userInfo: state.firebase.profile,
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Messaging);

/*
  Add a new message entry to the Firebase database.
  return firebase
    .firestore()
    .collection("messages")
    .add({
      name: getUserName(),
      text: messageText,
      profilePicUrl: getProfilePicUrl(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .catch(function(error) {
      console.error("Error writing new message to Firebase Database", error);
    });
}
*/
