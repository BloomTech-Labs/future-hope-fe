import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBFormInline,
  MDBIcon
} from "mdbreact";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { firestore, auth } from "../../config/fbConfig.js";
import SearchResults from "./SearchResults";

const MeetingModal = props => {
  const [meeting, setMeeting] = useState({
    title: "",
    start: Date.now()
    // endDate: ""
  });
  const [participants, setParticipants] = useState({});
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleStartDateChange(date) {
    // console.log('date', date);
    // console.log('get Hours', date._d.getHours());
    // console.log('get milliseconds', date._d.getMilliseconds());

    setMeeting({
      ...meeting,
      start: date
    });
  }

  // function handleEndDateChange(date) {
  //   changeEndDate(date._d);
  // }

  const submitMeeting = e => {
    e.preventDefault();
    let newParticipants = [];
    if (participants.length) {
      newParticipants = participants.map(participant => participant.uid);
    }
    newParticipants.push(auth.currentUser.uid);
    let newMeeting = {
      ...meeting,
      participantUIDs: newParticipants
    };
    console.log(newMeeting);
    //* Adding Event to Calendar
    props.addMeeting(newMeeting);
    //* Turning off the Modal
    props.toggle();
  };

  const searchParticipants = async searchTerm => {
    console.log(searchTerm);
    let searchArray = [];
    const usersRef = firestore.collection("users");
    await usersRef
      .where("fullName", "==", searchTerm)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          searchArray.push(doc.data());
        });
      });
    setSearchResults(searchArray);
  };

  const toggleSearchModal = () => {
    setShowSearchResults(!showSearchResults);
  };

  //! Using useEffect to update the date picker with the day selected from Calendar component
  useEffect(() => {
    setMeeting({
      ...meeting,
      start: props.clickedDate
    });
  }, [props.clickedDate]);

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
            value={meeting.title}
            onChange={e =>
              setMeeting({
                ...meeting,
                title: e.target.value
              })
            }
          />
          {/* //! Now that the date is updating should we change this to just a time picker? */}
          <DateTimePicker
            value={meeting.start}
            size='lg'
            disablePast
            onChange={date => {
              setMeeting({
                ...meeting,
                start: date._d
              });
            }}
            label='Start time'
            showTodayButton
          />
          {/* //! Removing end datetime picker for now. Needs to auto-populate based on start time. Might not need picker at all, just a length drop down, then parse the end date.
          <DateTimePicker
            value={endDate}
            disablePast
            onChange={handleEndDateChange}
            label='End time'
            showTodayButton
          /> */}
          {/* <MDBInput
            label='Select Participants'
            type='text'
            value={participants}
            onChange={e => changeParticipants(e.target.value)}
          /> */}
          <MDBFormInline
            className='md-form'
            onSubmit={async e => {
              e.preventDefault();
              await searchParticipants(searchTerm);
              toggleSearchModal();
            }}
          >
            <MDBIcon icon='search' />
            <input
              className='form-control form-control-sm ml-3 w-75'
              type='text'
              placeholder='Search Participants'
              aria-label='Search Participants'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </MDBFormInline>
          <SearchResults
            showSearchResults={showSearchResults}
            setParticipants={setParticipants}
            toggleSearchModal={toggleSearchModal}
            searchResults={searchResults}
            setSearchTerm={setSearchTerm}
          />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color='secondary' onClick={e => props.toggle()}>
            Close
          </MDBBtn>
          <MDBBtn color='primary' onClick={e => submitMeeting(e)}>
            Save changes
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default MeetingModal;
