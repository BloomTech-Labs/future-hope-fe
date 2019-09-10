import React, { useState, useEffect } from "react";

import Message from "./Message.js";
import { firestore } from "../../config/fbConfig.js";


const Conversation = props => {
  const [text, setText] = useState('');
  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);

  //access the subcollection of messages when selecting a conversation
  useEffect(() => {
    console.log('useEffect triggered inside Conversations')
    if(props.conversation.uid){
      let messages = [];
      const messagesRef = firestore
        .collection('conversations')
        .doc(props.conversation.uid)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .limit(20);
  
      messagesRef.onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          const message = doc.data()
          //first, pull uid of sender
          //query props.conversation.participantUIDs for index of uid
          let index = props.conversation.participantUIDs.indexOf(message.sentBy)
          // use index number to query participantNames and participantAvatars
          let avatar = props.conversation.participantAvatars[index]
          let name = props.conversation.participantNames[index]
          // add sentBy name and avatar to message
          message.name = name
          message.avatar = avatar
          message.timestamp.milliseconds = message.timestamp.seconds * 1000 
          messages.push(message)
        })
      })
      setMessages(messages)
    }
  },[props.conversation])

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
    <div className='conversations-wrapper'>
      {console.log('conversation rendered')}
      {/* //! pass relevant props, button needs onsubmit*/}
    
      <Message messages={messages} />
    
      <div className="input-wrapper">
        <input 
          placeholder="Enter a Message"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}>
        </input>
        <button onSubmit={createMessage}>Send Message</button>
      </div>
    </div>
  );
};



export default Conversation;
