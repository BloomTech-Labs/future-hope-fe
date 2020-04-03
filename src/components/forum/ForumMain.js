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
    const [modal, setModal] = useState(false)
    const [limit, setLimit] = useState(10)



    useEffect(() => {
        firestore.collection("threads").orderBy('postTime', 'desc').limit(limit).onSnapshot(querySnapshot => {
            let threadArray = [];
            querySnapshot.forEach(doc => {

                threadArray.push({
                    ...doc.data()
                });
            });
            setThreads(threadArray)

        });
    }, [limit]);

    const pushToThreadView = e => {


        props.history.push(`/forums/thread/${e.threadId}`);


    };

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
            threadId: guid(),
            pinned: false
        }

        e.preventDefault()
        console.log(title, body)
        firestore.collection('threads').add(post)
            .then(toggleModal())
    }
    const preventBubble = (e) => {
        e.stopPropagation()
    }
    return (
        <div className='outer'>
            <div className='main'>

                <div onClick={toggleModal} className={modal ? 'modal display-block' : 'modal display-none'} >

                    {modal ?
                        <form onClick={preventBubble} className='modal-main' onSubmit={handleSubmit}>
                            <h3>Start a new thread:</h3>
                            <h5>Title:</h5><input style={{ width: '100%' }} type='text' onChange={titleChange} placeholder='Thread name...' />
                            <h5>Body:</h5><textarea style={{ width: '100%' }} type='text' onChange={bodyChange} placeholder='Thread name...' />
                            <div className='button-container'>
                                <Button style={{ color: '#0042F2' }} type='button' onClick={toggleModal}>Cancel</Button>
                                <Button variant='outlined' type='submit' style={{ backgroundColor: '#0042F2', color: 'white' }} >Confirm</Button>
                            </div>
                        </form> :
                        <div>

                        </div>}
                </div>
                <div className='labels'><span style={{ width: '29%' }}>Thread</span><span style={{ width: '29%' }}>Posted by</span><span style={{ width: '29%' }}>Posted at</span><span style={{ width: '10%', cursor: 'pointer', color: '#0042F2' }} onClick={toggleModal}>New Thread</span></div>
                <div>
                    {props.userInfo.awaitingApproval === false ? threads.map((e, i) => {
                        return (
                            <div className={i % 2 === 0 ? 'thread-odd' : 'thread'} > <span style={{ width: '29%', color: '#0042F2', cursor: 'pointer' }} onClick={() => pushToThreadView(e)}>{e.threadName} </span><span style={{ width: '29%' }}>{e.posterName}</span><span style={{ width: '29%' }}>{e.postTime.toDate().toLocaleString()} </span><span style={{ width: '10%' }}></span></div>
                        )
                    }) : <h1>You must be logged in with an approved account to view forum threads.</h1>}
                </div>
                <div>
                    <Button style={{ margin: '1%' }} variant='outlined' type='button' onClick={() => setLimit(limit + 10)}>Show More</Button>
                    {limit > 10 ? < Button style={{ margin: '1%' }} variant='outlined' type='button' onClick={() => setLimit(10)}>Show Less</Button> : <div></div>}
                </div>
            </div >
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