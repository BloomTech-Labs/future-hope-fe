import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "../mui/Typography";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100vh"
  },
  cta: {
    fontSize: ".8rem",
    padding: "1.2rem",
    color: "white",
    fontWeight: 700,
    letterSpacing: ".1rem",
    lineHeight: "1.4rem",
    textTransform: "uppercase",
    marginBottom: theme.spacing(3)
  },
  container: {
    marginLeft: "1rem",
    marginBottom: theme.spacing(5),
    justify: "center",
    position: "relative"
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5)
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  }
});

function LandingMission(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <section className={classes.root}>
        <Grid spacing={2} className={classes.container}>
          <Grid item>
            <Typography variant="h6">Our Mission</Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                We aim to Create a level playing field in education in
                developing countries by providing supplemental, virtual mentors
                to underserved rural and urban-poor schools.
              </ListItem>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Our Approach</Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                Engage retired persons and interested volunteers to spend one
                hour per week using available technology to connect with school
                classrooms in developing countries.
              </ListItem>
            </Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                Collaborate with local teachers to provide the most appropriate
                interaction, questions, projects and supplemental materials
                given the learning objectives of each teacher/classroom.
              </ListItem>
            </Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                Utilize Kahn Academy Lite, Wikipedia, and other electronic
                resources that may be at a school or near by library to broaden
                students understanding of a topic
              </ListItem>
            </Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                Strive to ask questions and promote self-discovery rather than
                give answers between volunteers and students
              </ListItem>
            </Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                Understand required government curriculum requirements and tests
                and help students prepare and pass such tests like the Basic
                Education Competency Exam (BECE) in West Africa
              </ListItem>
            </Typography>
            <Typography variant="h6">Our Values</Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                Use whatever technology is available while simultaneously
                looking for ways to enhance technological infrastructure in
                local schools whenever possible
              </ListItem>
            </Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                Rely on local teachers for basic direction including suggestions
                on approach, topics, etc.
              </ListItem>
            </Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                Respect local cultures and differences without attempting to
                Americanize students or curriculum
              </ListItem>
            </Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                Emphasize the values of a liberal education that promotes
                critical thinking skills
              </ListItem>
            </Typography>
            <Typography component="p" variant="p" gutterBottom>
              <ListItem>
                Use pass rates for required government tests as the primary
                measure of success
              </ListItem>
            </Typography>
          </Grid>
        </Grid>
      </section>
    </Paper>
  );
}

LandingMission.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingMission);
