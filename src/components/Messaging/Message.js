import React from "react";

const Message = props => {
  console.log('Message Component render', props.message)
 
    return (
      <div className='message-wrapper'>
        {/* //! replace with props, add img for profile pic */}
        <p>{props.message.content}</p>
      </div>
    );
  
};

export default Message;


// {
//   props.messages.map(message => {
//     console.log('message', message)
//     return(
//       <p>{message.content}</p>
//     )
//   })
// }