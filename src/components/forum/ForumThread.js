import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { firestore } from "../../config/fbConfig.js";








const ForumMain = props => {
    const { id } = useParams()
    const [thread, setThread] = useState([]);
    const [comments, setComments] = useState([])
    const [modal, setModal] = useState(false)
    useEffect(() => {
        firestore.collection("threads").where('threadId', '==', id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    setThread([doc.data()])
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        let commentArr = []
        firestore.collection("comments").where('threadId', '==', id).orderBy('postTime')
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log("target", doc.data());
                    commentArr.push({ ...doc.data() })
                });
                setComments(commentArr)
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });


    }, []);


    const toggleModal = uid => {
        setModal(!modal);
    };

    return (
        <div >
            <div>
                {thread.map((e) => {
                    return (<div>
                        <h3>
                            {e.threadName}
                        </h3>
                        <p>
                            {e.threadBody}
                        </p>
                        <p>
                            Posted by: {e.posterName} on {e.postTime.toDate().toDateString()} at {e.postTime.toDate().toTimeString()}
                        </p>
                    </div>)
                })}

            </div>
            {!modal ? <Button onClick={toggleModal}>Add A Comment</Button> : <div></div>}
            {modal ?
                <div>
                    <input style={{ width: '50vw' }} type='text' placeholder='Add a comment...'></input>
                    <div><Button onClick={toggleModal}>Cancel</Button>
                        <Button onClick={toggleModal}>Confirm</Button>
                    </div>
                </div> :
                <div>
                </div>}
            <div>
                <h4>
                    Comments
                    </h4>
                {comments.map(e => {
                    return (
                        <div>
                            <p>
                                {e.comment}
                            </p>
                            <p>
                                Posted by: {e.posterName} on {e.postTime.toDate().toDateString()} at {e.postTime.toDate().toTimeString()}
                            </p>
                        </div>
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