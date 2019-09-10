import React, { useState, useEffect } from "react";

import Message from "./Message.js";
import { firestore } from "../../config/fbConfig.js";
import moment from '@date-io/moment';


const Conversation = props => {
  const [text, setText] = useState('');
  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);

  //access the subcollection of messages when selecting a conversation
  useEffect(() => {
    console.log('useEffect triggered inside Conversations')
    if(props.selectedConversation.uid){
      setConversation(props.selectedConversation)
      let messages = [];
      const messagesRef = firestore
        .collection('conversations')
        .doc(props.selectedConversation.uid)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .limit(20);
  
      messagesRef.onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          const message = doc.data()
          //first, pull uid of sender
          //query props.conversation.participantUIDs for index of uid
          let index = props.selectedConversation.participantUIDs.indexOf(message.sentBy)
          // use index number to query participantNames and participantAvatars
          let avatar = props.selectedConversation.participantAvatars[index]
          let name = props.selectedConversation.participantNames[index]
          // add sentBy name and avatar to message
          message.name = name
          message.avatar = avatar
          message.timestamp.milliseconds = message.timestamp.seconds * 1000 
          messages.push(message)
        })
        setMessages(messages)
      })
    }
  },[props.selectedConversation])

    //Create the message, add it to firestore
    const createMessage = async messageText => {
      console.log()
      const newMessage = {
        content: messageText,
        sentBy: props.userInfo.uid,
        timestamp: new Date()
      }
      try{
        const messageRef = await firestore
          .collection("conversations")
          .doc(conversation.uid)
          .collection('messages')
          .doc()
  
        newMessage.uid = messageRef.id
        messageRef.set(newMessage)
      } catch(err) {
          console.log("Error occured in creating message:", err);
      }
    };
  return (
    <div className='conversations-wrapper'>
      {
        messages.map(message => {          
          return(
            <Message message={message} />
          )
        })
      }
    
      <div className="input-wrapper">
        <input 
          placeholder="Enter a Message"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}>
        </input>
        <button onClick={e => createMessage(text)}>Send Message</button>
      </div>
    </div>
  );
};



export default Conversation;
