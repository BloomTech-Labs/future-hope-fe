import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { firestore } from "../../config/fbConfig.js";
import { Icon } from "@material-ui/core";
import './forums.css'







const ForumMain = props => {
    const { id } = useParams()
    const [thread, setThread] = useState([]);
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState([])
    const [modal, setModal] = useState(false)
    const [limit, setLimit] = useState(10)
    useEffect(() => {
        firestore.collection("threads").where('threadId', '==', id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    setThread([doc.data()])
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        let commentArr = []
        firestore.collection("comments").where('threadId', '==', id).orderBy('postTime', 'desc').limit(limit)
            .onSnapshot(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    console.log("target", doc.data());
                    commentArr.push({ ...doc.data() })
                });
                setComments(commentArr)
            })



    }, [modal, limit]);

    const commentChange = (e) => {
        setComment(e.target.value)
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
            comment: comment,
            commentId: guid(),
            threadId: thread[0].threadId
        }

        e.preventDefault()

        firestore.collection('comments').add(post)
            .then(toggleModal())
    }

    const toggleModal = () => {
        setModal(!modal);
    };

    const preventBubble = (e) => {
        e.stopPropagation()
    }

    return (
        <div className='main'>
            <div style={{ margin: '1%' }}>
                {thread.map((e) => {
                    return (<div>

                        <h3 style={{ fontWeight: 'bold' }}>
                            {e.threadName}
                        </h3>
                        <p style={{ fontWeight: 'bold' }}>
                            {e.threadBody}
                        </p>
                        <p>
                            Posted by: {e.posterName} on {e.postTime.toDate().toDateString()} at {e.postTime.toDate().toTimeString()}
                        </p>
                    </div>)
                })}

            </div >

            {modal ?
                <div onClick={toggleModal} className='modal display-block'>
                    <form onClick={preventBubble} className='modal-main' onSubmit={handleSubmit}>
                        <h3>Comment:</h3><input style={{ width: '100%' }} type='text' onChange={commentChange} placeholder='Thread name...' />
                        <div className='button-container'>
                            <Button style={{ color: '#0042F2' }} type='button' onClick={toggleModal}>Cancel</Button>
                            <Button variant='outlined' type='submit' style={{ backgroundColor: '#0042F2', color: 'white' }} >Confirm</Button>
                        </div>
                    </form>
                </div> :
                <div>
                </div>}
            <div >
                <div className='labels'>

                    <span style={{ width: '23%', cursor: 'pointer', color: '#0042F2', fontSize: '1.2vw' }} onClick={toggleModal}>
                        New Comment
                    </span>
                </div>
                {comments.map((e, i) => {
                    return (
                        <div className={i % 2 === 0 ? 'comment' : 'comment-odd'} >
                            <p >
                                {e.comment}
                            </p>
                            <div className='comment-footer'>
                                <p >
                                    {e.posterName}</p><span >{e.postTime.toDate().toLocaleString()}</span>

                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                <Button style={{ margin: '1%' }} variant='outlined' type='button' onClick={() => setLimit(limit + 10)}>Show More</Button>
                {limit > 10 ? < Button style={{ margin: '1%' }} variant='outlined' type='button' onClick={() => setLimit(10)}>Show Less</Button> : <div></div>}
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