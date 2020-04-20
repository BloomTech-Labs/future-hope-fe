import React, { useState, useEffect } from "react";

import Message from "./Message.js";
import { firestore } from "../../config/fbConfig.js";
import "../styles/messaging_button.css";

//analytics
import { event } from "../Analytics";


const Conversation = props => {
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);

  //access the subcollection of messages when selecting a conversation
  useEffect(() => {
    if (props.selectedConversation.uid) {
      setConversation(props.selectedConversation);
      firestore
        .collection("conversations")
        .doc(props.selectedConversation.uid)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .limit(15)
        .onSnapshot(querySnapshot => {
          let fetchedMessages = [];
          querySnapshot.forEach(doc => {
            const message = doc.data();
            //first, pull uid of sender;
            //query props.conversation.participantUIDs for index of uid
            let index = props.selectedConversation.participantUIDs.indexOf(
              message.sentBy
            );
            // use index number to query participantNames and participantAvatars
            let avatar = props.selectedConversation.participantAvatars[index];
            let name = props.selectedConversation.participantNames[index];
            // add sentBy name and avatar to message
            message.name = name;
            message.avatar = avatar;
            message.timestamp.milliseconds = message.timestamp.seconds * 1000;
            fetchedMessages.unshift(message);
          });
          setMessages(fetchedMessages);
          //auto scrolls to the bottom of the div so you see new messages first
          const messagesDiv = document.querySelector(".conversations-wrapper");
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });
    }
  }, [props.selectedConversation]);

  //Create the message, add it to firestore
  const createMessage = async messageText => {
    event("Message Btn Click", "user sent new message", "Conversation");
    const newMessage = {
      content: messageText,
      sentBy: props.userInfo.uid,
      timestamp: new Date()
    };
    try {
      const messageRef = await firestore
        .collection("conversations")
        .doc(conversation.uid)
        .collection("messages")
        .doc();

      newMessage.uid = messageRef.id;
      messageRef.set(newMessage);
    } catch (err) {
      console.log("Error occured in creating message:", err);
    }
    setText("");
  };
  return (
    <div className="conversations-wrapper">
      {messages.map(message => {
        // console.log(message, "IS THERE AN EMPTY?");
        return (
          <Message
            key={message.uid}
            message={message}
            userInfo={props.userInfo}
          />
        );
      })}
      {/* if there is a selected converstaion, diplay the input. otherwise no input fo you*/}
      {props.selectedConversation.uid && (
        <div className="input-wrapper">
          <form
            onSubmit={e => {
              e.preventDefault();
              createMessage(text);
            }}
          >
            <input
              className="myInput"
              placeholder="Enter A Message"
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <button
              className="myButton"
              onClick={e => {
                e.preventDefault();
                createMessage(text);
              }}

            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Conversation;
