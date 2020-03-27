import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { firestore } from "../../config/fbConfig.js";
import './forums.css'







const ForumMain = props => {
    const [threads, setThreads] = useState([]);
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        firestore.collection("threads").onSnapshot(querySnapshot => {
            let threadArray = [];
            querySnapshot.forEach(doc => {

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
    const toggleModal = () => {
        setModal(!modal);
    };

    const titleChange = (e) => {
        setTitle(e.target.value)
    }

    const bodyChange = (e) => {
        setBody(e.target.value)
    }

    let guid = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }



    const handleSubmit = (e) => {
        const date = new Date()
        let post = {
            postTime: date,
            posterName: props.userInfo.fullName,
            posterId: props.userInfo.uid,
            threadBody: body,
            threadName: title,
            threadId: guid()
        }

        e.preventDefault()
        console.log(title, body)
        firestore.collection('threads').add(post)
            .then(toggleModal())
    }

    return (
        <div className='main'>
            <div className='button-container'>
                {!modal ? <Button type='button' onClick={toggleModal}>Start a Thread</Button> : <div></div>}
                {modal ?
                    <form onSubmit={handleSubmit}>
                        <h3>Title:</h3><input style={{ width: '50vw' }} type='text' onChange={titleChange} placeholder='Thread name...' />
                        <h3>Body:</h3><textarea style={{ width: '50vw' }} type='text' onChange={bodyChange} placeholder='Thread name...' />
                        <div>
                            <Button type='button' onClick={toggleModal}>Cancel</Button>
                            <Button type='submit' >Confirm</Button>
                        </div>
                    </form> :
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