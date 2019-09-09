import React, { useState } from "react";

const ListConversations = props => {
  const [conversation, setConversation] = useState({});

  return (
    <div className='listConversations-wrapper'>
      {props.conversations.map(conversation => {
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
        conversation.participantUIDs.map(participantUID => {
          if (participantUID !== props.userInfo.uid) {
            return (uid = participantUID);
          }
        });
        return (
          <div
            className='conversation-item'
            onClick={e => {
              setConversation({
                avatar: avatar,
                name: name,
                uid: uid
              });
            }}
          >
            <img
              src={avatar || "https://source.unsplash.com/random/200x200"}
              alt='avatar'
            />
            <h3>{name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default ListConversations;
