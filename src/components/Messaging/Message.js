import React from "react";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  avatar: {
    margin: 10,
  }
});

const Message = props => {
 const classes = useStyles();
    return (
      <div className='message-wrapper'>
        {/* //! replace with props, add img for profile pic */}
        {/*<Avatar alt="user avatar" src={`${props.message.avatar}`} className={classes.avatar} /> */}
        <p>{props.message.content}</p>
       
      </div>
    );
  
};

export default Message;

