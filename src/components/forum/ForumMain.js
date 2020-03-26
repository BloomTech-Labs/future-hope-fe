import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { firestore } from "../../config/fbConfig.js";
import './forums.css'







const ForumMain = props => {
    const [threads, setThreads] = useState([]);
    console.log()
    useEffect(() => {
        firestore.collection("threads").onSnapshot(querySnapshot => {
            let threadArray = [];
            querySnapshot.forEach(doc => {
                console.log(doc.data())
                threadArray.push({
                    ...doc.data()
                });
            });
            setThreads(threadArray)
        });
    }, []);

    const pushToThreadView = uid => {

        props.history.push(`/forums/thread/${uid}`);


    };
    const [modal, setModal] = useState(false)
    const toggleModal = uid => {
        setModal(!modal);
    };


    return (
        <div className='main'>
            <div className='button-container'>
                {!modal ? <Button onClick={toggleModal}>Start a Thread</Button> : <div></div>}
                {modal ?
                    <div>
                        <input style={{ width: '50vw' }} type='text' placeholder='Thread name...'></input>
                        <div><Button onClick={toggleModal}>Cancel</Button>
                            <Button onClick={toggleModal}>Confirm</Button>
                        </div>
                    </div> :
                    <div>
                    </div>}
            </div>

            <div>
                {threads.map(e => {
                    return (
                        <div className='thread' onClick={() => pushToThreadView(e.threadId)}> <span>Thread: {e.threadName} </span><span>Posted by: {e.posterName} on {e.postTime.toDate().toDateString()} at {e.postTime.toDate().toTimeString()} </span></div>
                    )
                })}
            </div>

        </div>
    );
};

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
        userInfo: state.firebase.profile
    };
};

export default withRouter(connect(mapStateToProps)(ForumMain));