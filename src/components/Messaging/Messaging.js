import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestore } from "../../config/fbConfig.js";

import ListConversations from "./ListConversations.js";
import Conversation from "./Conversation";
import SideBar from "../dashboard/SideBar.js";

function Messaging(props) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    console.log(props);
    if (!props.userInfo.uid) {
      return;
    } else {
      console.log("uid", props.userInfo.uid);
      firestore
        .collection("conversations")
        .where("participantUIDs", "array-contains", props.userInfo.uid)
        .onSnapshot(querySnapshot => {
          console.log(querySnapshot);
          let conversations = [];
          querySnapshot.forEach(conversation => {
            conversations.push(conversation.data());
          });
          console.log(conversations);
          setConversations(conversations);
        });
    }
  }, [props.userInfo]);

  //Create the message, add it to firestore
  const createMessage = message => {
    return firestore
      .collection("conversations")
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
      <h1>Messages!</h1>
      {/* <SideBar /> */}
      <ListConversations
        conversations={conversations}
        userInfo={props.userInfo}
      />
      {/* <Conversation /> */}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userInfo: state.firebase.profile
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
