import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import "../styles/messaging_button.css";

//analytics
import { logPageView } from "../Analytics";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: 5,
    width: theme.spacing(3),
    height: theme.spacing(3),
  }
}));

// Component for displaying each message sent back and forth
const Message = props => {
  const classes = useStyles();

  useEffect(() => {
    logPageView();
  }, []);

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
          <p className="message">{props.message.content}</p>
        </div>
        <div className="sent-span">
          <span className="sent-date">
            Sent {moment(props.message.timestamp.toDate()).fromNow()}
          </span>

        </div>
      </div>
    </div >
  );
};

export default Message;
