// import React, { useState } from "react";

// import Conversation from "./Conversation.js";

// // import blank_user from '../../assets/img/blank_user.png'

// const ListConversations = props => {
//   const [conversation, setConversation] = useState({});

//   return (
//     <div className='listConversations-wrapper'>
//   {/* Map over conversation props, pull out the info we want.
//       Map again to get the avatar, name, and uid that is not the current users
//       display the other person's info
//   */}
//       {props.conversations.map(conversation => {
        
//         let avatar = "";
//         let name = "";
//         let uid = "";
//         conversation.participantAvatars.map(participantAvatar => {
//           if (participantAvatar !== props.userInfo.photoUrl) {
//             return avatar = participantAvatar;
//           }
//         });
//         conversation.participantNames.map(participantName => {
//           if (participantName !== props.userInfo.fullName) {
//             return (name = participantName);
//           }
//         });
//         uid = conversation.uid
//         return (
//           <div
//             className='conversation-item'
//             onClick={e => {
//               setConversation({
//                 ...conversation
//               });
//             }}
//           >
//             <img
//               src={avatar || "https://source.unsplash.com/random/200x200"}
//               alt='avatar'
//             />
//             <h3>{name}</h3>
//           </div>
//           );
//           })}
//             <Conversation conversation={conversation} />
//     </div>
//   );
// };

// export default ListConversations;
