import React, { useState, useEffect } from "react";
import { MDBInput } from "mdbreact";

import Message from "./Message.js";
import { firestore } from "../../config/fbConfig.js";

//analytics
import { event } from "../Analytics";

const Conversation = props => {
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);

  //access the subcollection of messages when selecting a conversation
  useEffect(() => {
    console.log("useEffect triggered inside Conversations");
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
              placeholder="Enter A Message"
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <button
              onClick={e => {
                e.preventDefault();
                createMessage(text);
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Conversation;

/*
          const messagesDiv = document.getElementById("conversations-wrapper");
          messagesDiv.scrollTop = messagesDiv.scrollHeight;

function saveImageMessage(file) {
/TODO 9: Posts a new image as a message.
    /1 - We add a message with a loading icon that will get updated with the shared image.
    firebase.firestore().collection('messages').add({
      name: getUserName(),
      imageUrl: LOADING_IMAGE_URL,
      profilePicUrl: getProfilePicUrl(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function(messageRef) {
      / 2 - Upload the image to Cloud Storage.
      var filePath = firebase.auth().currentUser.uid + '/' + messageRef.id + '/' + file.name;
      return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
        /3 - Generate a public URL for the file.
        return fileSnapshot.ref.getDownloadURL().then((url) => {
          / 4 - Update the chat message placeholder with the image's URL.
          return messageRef.update({
            imageUrl: url,
            storageUri: fileSnapshot.metadata.fullPath
          });
        });
      });
    }).catch(function(error) {
      console.error('There was an error uploading a file to Cloud Storage:', error);
    });

    

*/
