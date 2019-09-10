import React from "react";

const Message = props => {
  return (
    <div className='message-wrapper'>
      {/* //! replace with props, add img for profile pic */}
      {
        props.messages.map(message => {
          return(
            <p>{message.content}</p>
          )
        })
      }
    </div>
  );
};

export default Message;
