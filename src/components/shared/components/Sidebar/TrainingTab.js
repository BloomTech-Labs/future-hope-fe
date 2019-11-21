import React, { useState, useEffect } from "react"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ListItem from "@material-ui/core/ListItem"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { firestore } from "../../../../config/fbConfig"
import { Link } from "react-router-dom"

// const options = ["Food", "Society", "Slang", "Geography"];

const ITEM_HEIGHT = 48

export default function TrainingTab() {
  const [options, setOptions] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    let unsubcribe = firestore
      .collection("trainingTabNav")
      .onSnapshot(snapshot => {
        let trainingTabs = snapshot.docs.map(doc => {
          return doc.data().navName
        })
        setOptions(trainingTabs)
      })

    return unsubcribe
  }, [])

  useEffect(() => {
    let unsubcribe = firestore
      .collection("trainingTabNav")
      // .collection("training")
      .onSnapshot(snapshot => {
        let trainingTabs = snapshot.docs.map(doc => {
          return doc.data().navName;
        });
        setOptions(trainingTabs);
      });

    return unsubcribe;
  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}
      >
        {options.map(
          option =>
             (
              <MenuItem
                component={Link}
                to={`/training/${option.toLowerCase()}`}
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            )
        )}
      </Menu>
    </div>
  )
}
