import React from "react";
import { connect } from "react-redux";

import Message from "./Message";

const Conversations = props => {
  return (
    <div className='conversations-wrapper'>
      {/* //! pass relevant props */}
      <Message />
    </div>
  );
};

const mapStateToProps = state => {};

export default connect(mapStateToProps)(Conversations);
