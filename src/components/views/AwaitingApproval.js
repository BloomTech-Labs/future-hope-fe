import React from "react";
import { MDBContainer } from "mdbreact";
import { Button } from "@material-ui/core";

class AwaitingApproval extends React.Component {
  //leaving this as a class component in case we do state stuff in the future

  pushToHomePage = () => {
    this.props.history.push(`/`);
  };

  render() {
    return (
      <MDBContainer fluid className="d-flex flex-column align-items-center">
        <h2 className="p-2">Your application has been submitted!</h2>
        <h4>Here's what happens next: </h4>
        <ul className="p-3">
          <li className="p-1">
            Your application has been sent to an administrator for approval.
          </li>
          <li className="p-1">
            Once your application is accepted, you can start exploring the app!
          </li>
          <li className="p-1">
            Please contanct CONTACTINFOHERE for further information regarding
            your application.
          </li>
        </ul>
        <div>
          <Button onClick={() => this.pushToHomePage()}>Return to HomePage</Button>
        </div>
      </MDBContainer>
    );
  }
}

export default AwaitingApproval;

/*
here is that progress bar I was using.

<div className = 'w-75'>
                    <MDBProgress material value = {this.state.progress} height = '20px' width = '100%'>
                        {`${this.state.progress}%`}
                    </MDBProgress>
                </div>


*/
