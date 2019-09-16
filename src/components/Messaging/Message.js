import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  avatar: {
    margin: 10
  }
});

const Message = props => {
  const classes = useStyles();

  return (
    <div
      className={`message-wrapper ${
        props.message.sentBy === props.userInfo.uid ? "match" : "no-match"
      }`}
    >
      {/* //! replace with props, add img for profile pic */}
      {/*<Avatar alt="user avatar" src={`${props.message.avatar}`} className={classes.avatar} /> */}

      <p>{props.message.content}</p>
    </div>
  );
};

export default Message;

//With overflow: auto, a scroll bar is available with messages to check older ones. Do we need a limit if we have that
//capability? Do we change limit on scroll up?
