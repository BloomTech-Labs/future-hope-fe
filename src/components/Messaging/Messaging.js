import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestore } from "../../config/fbConfig.js";

import ListConversations from "./ListConversations.js";
import Conversation from "./Conversation";
import SideBar from "../dashboard/SideBar.js";

import "./Messaging.scss";

function Messaging(props) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState({});

  useEffect(() => {
    if (!props.userInfo.uid) {
      return;
    } else {
      firestore
        .collection("conversations")
        .where("participantUIDs", "array-contains", props.userInfo.uid)
        .onSnapshot(querySnapshot => {
          let conversations = [];
          querySnapshot.forEach(conversation => {
            conversations.push(conversation.data());
          });
          setConversations(conversations);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="messaging-wrapper">
      {/* <h1>Messages!</h1> */}
      <div className="list-conversations-wrapper">
        {/* Map over conversation props, pull out the info we want.
          Map again to get the avatar, name, and uid that is not the current users
          display the other person's info
      */}
        {conversations.map(conversation => {
          let avatar = "";
          let name = "";
          let uid = "";
          conversation.participantAvatars.map(participantAvatar => {
            if (participantAvatar !== props.userInfo.photoUrl) {
              return (avatar = participantAvatar);
            }
          });
          conversation.participantNames.map(participantName => {
            if (participantName !== props.userInfo.fullName) {
              return (name = participantName);
            }
          });
          uid = conversation.uid;
          return (
            <div
              className="conversation-list-item"
              onClick={e => {
                setSelectedConversation({
                  ...conversation
                });
              }}
            >
              <img
                src={avatar || "https://source.unsplash.com/random/200x200"}
                alt="avatar"
              />
              <h3>{name}</h3>
            </div>
          );
        })}
      </div>
      <Conversation conversation={selectedConversation} />
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
 <div className='messaging-wrapper'>
      <h1>Messages!</h1>
      {/* <SideBar /> 
      <ListConversations
        conversations={conversations}
        userInfo={props.userInfo}
      />
    </div>
*/
