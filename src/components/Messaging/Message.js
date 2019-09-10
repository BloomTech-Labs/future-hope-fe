import React from "react";

const Message = props => {
  console.log('Message Component render')
  if(!props.messages.length){
    return <h4>Loading messages...</h4>
  } else {
    return (
      <div className='message-wrapper'>
        {/* //! replace with props, add img for profile pic */}
        {
          props.messages.map(message => {
            console.log('message', message)
            return(
              <p>{message.content}</p>
            )
          })
        }
      </div>
    );
  }
};

export default Message;


