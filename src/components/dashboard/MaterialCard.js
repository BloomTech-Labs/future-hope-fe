import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 345,
    margin: "0 20px"
  },
  media: {
    height: 140
  },
  area: {
    flex: "1 0 auto"
  }
})

const MaterialCard = props => {
  const { title, description, source } = props.material
  console.log(props)
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.area}>
        <CardMedia
          className={classes.media}
          //   image={image}
          title="Old Picture of Ghana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title || "Ghana"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description || "Learn more about Ghana from this page"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          <a href={source}>Learn More</a>
        </Button>
      </CardActions>
    </Card>
  )
}
export default MaterialCard
