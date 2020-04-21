import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Modal from "@material-ui/core/Modal"
import Typography from "@material-ui/core/Typography"

import firebase from "../../config/fbConfig"
import EditMaterial from "./admin-dashboard/EditMaterial"

import "../styles/Dashboard.css"

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 345,
    marginBottom: 15,
    width: 345
  },
  media: {
    height: 140
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const MediaCard = props => {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)
  const [userData, setUserData] = useState([])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEditOpen = () => {
    setEditOpen(true)
  }

  const handleEditClose = () => {
    setEditOpen(false)
  }

  const handleDelete = async id => {
    const deletedDoc = await firebase
      .firestore()
      .collection(`training/${props.topic}/modules`)
      .doc(id)
      .delete()

    setOpen(false)
  }

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(`users`)
      .where("uid", "==", JSON.parse(localStorage.getItem("UID")))
      .onSnapshot(
        snapshot => {
          const completedTrainingDocs = snapshot.docs.map(doc => {
            return {
              ...doc.data()
            }
          })
          setUserData(completedTrainingDocs)
        },
        error => {

        }
      )
    return () => {
      unsubscribe()
    }
  }, [])

  const userID = JSON.parse(localStorage.getItem("UID"))

  const trainingUpdate = () => {
    if (userData[0].completedTrainingProgress.includes(props.material.id)) {
      let docRef = firebase.firestore().collection("users").doc(userID)
      let removeMaterial = docRef.update({
        "completedTrainingProgress": firebase.firestore.FieldValue.arrayRemove(props.material.id)
      })
    } else {
      const unsubscribe = firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .update({
          completedTrainingProgress: [
            ...userData[0].completedTrainingProgress,
            props.material.id
          ]
        })
    }
  }

  return (
    <Card className={classes.card}>
      <a
        className="card-link"
        href={props.material.source}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.material.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.material.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </a>
      <CardActions>
        {props.type === "admin" && (
          <Button size="small" color="primary" onClick={handleEditOpen}>
            <span className="aButton">Edit</span>
          </Button>
        )}

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={editOpen}
          onClose={handleEditClose}
        >
          <EditMaterial
            material={props.material}
            closeWindow={handleEditClose}
          />
        </Modal>
        {props.type === "admin" && (
          <Button size="small" color="secondary" onClick={handleOpen}>
            <span className="aButton">Delete</span>
          </Button>
        )}

        <Button
          size="small"
          color="secondary"
          className="complete-btn"
          onClick={trainingUpdate}
        >
          <span className="aButton">Complete</span>
        </Button>
        {/* Pop up window on Delete */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Delete this material?</h2>
            <p id="simple-modal-description">This action cannot be reversed.</p>
            <Button
              className="confirmDelete"
              variant="contained"
              color="primary"
              onClick={() => handleDelete(props.material.id)}
            >
              Yes, delete it.
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              No
            </Button>
          </div>
        </Modal>
      </CardActions>
    </Card>
  )
}

export default MediaCard
