import React from "react";
import { withRouter } from "react-router";
//styles
import { MDBContainer, MDBBtn } from "mdbreact";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(4),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
}));

const AwaitingApproval = props => {
  const classes = useStyles();

  const pushToHomePage = () => {
    props.history.push(`/`);
  };

  return (
    <Paper className={classes.paper}>
      <MDBContainer fluid className="d-flex flex-column align-items-center">
        <h1 className="p-2">Your application has been submitted!</h1>
        <h3>Here's what happens next: </h3>
        <ul className="p-3">
          <li className="p-1">
            Your application will be reviewed and approved by the administrator.
          </li>
          <li className="p-1">
            Once your application is approved, you can start exploring the app
            to connect with other users!
          </li>
        </ul>
        <h3>
          Thank you for your interest in Future Hope School. <br />
          Medaase Paa! (pronounced ‘me-daa-si paa‘).
        </h3>
        <div>
          <MDBBtn color="orange" onClick={() => pushToHomePage()}>
            Return to HomePage
          </MDBBtn>
        </div>
      </MDBContainer>
    </Paper>
  );
};

export default withRouter(AwaitingApproval);

/*
here is that progress bar I was using.

<div className = 'w-75'>
                    <MDBProgress material value = {this.state.progress} height = '20px' width = '100%'>
                        {`${this.state.progress}%`}
                    </MDBProgress>
                </div>


*/
