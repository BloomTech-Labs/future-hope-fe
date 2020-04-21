import React, { useState, useEffect } from "react"
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles"
import firebase from "../../config/fbConfig"
import LinearProgress from "@material-ui/core/LinearProgress"
import { borderRight } from "@material-ui/system"

const displayWidth = window.innerWidth

const BorderLinearProgress = withStyles({
  root: {
    height: 25,
    borderRadius: 50,
    backgroundColor: lighten("#bb535c", 0.7),
    width: displayWidth * 0.85
  },
  bar: {
    borderRadius: 50,
    backgroundColor: "#ff6c5c"
  }
})(LinearProgress)

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    // margin: theme.spacing(1),
    // marginTop: 15,
    // marginLeft: 75,
    margin: "auto",
    width: "60%"
  }
}))

const ProgressBar = props => {
  const classes = useStyles()

  return (
    <>
      <BorderLinearProgress
        className={classes.margin}
        variant="determinate"
        color="secondary"
        value={props.completedTrainingNumber || 0}
      />
    </>
  )
}

export default ProgressBar
