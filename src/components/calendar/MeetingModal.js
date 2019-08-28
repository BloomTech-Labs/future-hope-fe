import React, { useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput
} from "mdbreact";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const MeetingModal = props => {
  const [startDate, changeStartDate] = useState(new Date());
  const [endDate, changeEndDate] = useState(new Date());
  const [title, changeTitle] = useState("");
  const [participants, changeParticipants] = useState("");

  function handleDateChange(date) {
    changeStartDate(date);
  }

  return (
    <MDBContainer>
      <MDBModal isOpen={props.showModal} toggle={props.toggle} centered>
        <MDBModalHeader toggle={props.toggle}>Create Meeting</MDBModalHeader>
        <MDBModalBody>
          <MDBInput
            label='Add title'
            //   icon='envelope'
            //   group
            size='lg'
            type='text'
            validate
            value={title}
            onChange={e => changeTitle(e.target.value)}
          />
          <DateTimePicker
            value={startDate}
            disablePast
            onChange={handleDateChange}
            label='Start time'
            showTodayButton
          />
          <DateTimePicker
            value={endDate}
            disablePast
            onChange={e => changeEndDate(e.target.value)}
            label='Start time'
            showTodayButton
          />
          <MDBInput
            label='Select Participants'
            type='text'
            value={participants}
            onChange={e => changeParticipants(e.target.value)}
          />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color='secondary' onClick={e => props.toggle()}>
            Close
          </MDBBtn>
          <MDBBtn color='primary'>Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default MeetingModal;
