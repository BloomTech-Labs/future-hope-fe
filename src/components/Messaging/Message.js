import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles({
  avatar: {
    margin: 10
  }
});

const Message = props => {
  const classes = useStyles();
  // const {timestamp} = props;
  return (
    <div className="message-container">
      <div
        className={`message-wrapper ${
          props.message.sentBy === props.userInfo.uid ? "right" : "left"
        }`}
      >
        <div className="message-sender">
          <h6>{props.message.name}</h6>
        </div>
        <div className="message-content">
          <p>{props.message.content}</p>
        </div>
        <div>
          <span className="sent-date">
            Sent {moment(props.message.timestamp.toDate()).fromNow()}
          </span>
        </div>
      </div>
      <div
        className={`message-avatar ${
          props.message.sentBy === props.userInfo.uid
            ? "avatar-right"
            : "avatar-left"
        }`}
      >
        <Avatar
          alt="user avatar"
          src={`${props.message.avatar}`}
          className={classes.avatar}
        />
      </div>
    </div>
  );
};

export default Message;

//With overflow: auto, a scroll bar is available with messages to check older ones. Do we need a limit if we have that
//capability? Do we change limit on scroll up?
//! TO put the name and sent by outside of the message div, maybe do div styling around p tag only
/*

  <div className="message-container">
      <div
        className={`message-wrapper ${
          props.message.sentBy === props.userInfo.uid ? "match" : "no-match"
        }`}
      >
        <p>{props.message.content}</p>
      </div>
      <div
        className={`message-avatar ${
          props.message.sentBy === props.userInfo.uid ? "match" : "no-match"
        }`}
      >
        <Avatar
          alt="user avatar"
          src={`${props.message.avatar}`}
          className={classes.avatar}
        />
      </div>
    </div>




*/
