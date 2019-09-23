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
import { connect } from "react-redux";

import { firestore, auth } from "../../config/fbConfig.js";
import SearchResults from "../shared/components/SearchResults.js";

//analytics
import { event } from "../Analytics";

const MeetingModal = props => {
  const [meeting, setMeeting] = useState({
    title: "",
    start: Date.now()
    // endDate: ""
  });
  const [participants, setParticipants] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [displayParticipants, setDisplayParticipants] = useState("");

  function handleStartDateChange(date) {
    setMeeting({
      ...meeting,
      start: date
    });
  }

  //* Used to submit new and updated meetings
  const submitMeeting = e => {
    e.preventDefault();
    //* Adds existing Participants to newParticipants obj. If new meeting, set blank arrays
    let newParticipants = {
      participantUIDs: meeting.participantUIDs || [],
      participantNames: meeting.participantNames || []
    };
    //* Checks if new participants have been added and if they are new, adds them to newParticipants obj
    if (participants.length) {
      participants.map(participant => {
        if (!newParticipants.participantUIDs.includes(participant.uid)) {
          newParticipants.participantUIDs.push(participant.uid);
          newParticipants.participantNames.push(participant.fullName);
        }
      });
    }
    //* Checks if meeting being submitted is new and if it is, push newParticipants in
    if (!meeting.id) {
      newParticipants.participantUIDs.push(props.user.uid);
      newParticipants.participantNames.push(props.user.fullName);
    }
    //* Combine participant user info with meeting info into newMeeting Obj
    let newMeeting = {
      ...meeting,
      ...newParticipants
    };
    //* check if a previous meeting was clicked on to see if routing to new meeting or old
    if (meeting.id) {
      props.editMeeting(newMeeting);
    } else {
      //* Adding Event to Calendar
      props.addMeeting(newMeeting);
    }
    //* reset meeting state
    setMeeting({ title: "", start: Date.now() });
    //* Turning off the Modal
    props.toggle();
  };

  //* Searches for users to add to meeting
  //! NOTE: Only exact searches work. Need to implement fuzzy search
  const searchParticipants = async searchTerm => {
    event(
      "Search-Users",
      "Searching for users to add to a meeting",
      "Calendar Meeting Modal"
    );
    let searchArray = [];
    const usersRef = firestore.collection("users");
    await usersRef
      .where("fullName", "==", searchTerm)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          searchArray.push(doc.data());
        });
      });
    //* Set results in state, clear search term
    setSearchResults(searchArray);
    setSearchTerm("");
  };

  const toggleSearchModal = () => {
    setShowSearchResults(!showSearchResults);
  };

  //* Used to display all participant names in meeting and about to be invited
  const participantsDisplay = invitedUsers => {
    // console.log("invitedUsers", invitedUsers);
    invitedUsers.map(invitedUser => {
      if (!displayParticipants) {
        setDisplayParticipants(displayParticipants + `${invitedUser.fullName}`);
      } else {
        setDisplayParticipants(
          displayParticipants + `, ${invitedUser.fullName}`
        );
      }
    });
  };

  //* Using useEffect to update the Modal with the item clicked on (date or event)
  useEffect(() => {
    setMeeting(props.clickedMeeting);
    // debugger;
    if (props.clickedMeeting.id) {
      let participantNames = "";
      props.clickedMeeting.participantNames.map(participantName => {
        // console.log("participant in useEffect", participantName);
        if (participantName !== props.user.fullName) {
          if (!participantNames) {
            // console.log("should only run first time", displayParticipants);
            participantNames += participantName;
            // console.log("displayParticipants", displayParticipants);
          } else {
            // console.log("should run only after first time");
            participantNames += `, ${participantName}`;
          }
        }
      });
      setDisplayParticipants(participantNames);
    }
  }, [props.clickedMeeting]);

  return (
    <MDBContainer>
      <MDBModal isOpen={props.showModal} toggle={props.toggle} centered>
        <MDBModalHeader
          toggle={e => {
            setMeeting({ title: "", start: Date.now() });
            setDisplayParticipants("");
            props.toggle();
          }}
        >
          {meeting.id ? `Edit Meeting` : `Create Meeting`}
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput
            label="Add title"
            //   icon='envelope'
            //   group
            size="lg"
            type="text"
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
            size="lg"
            disablePast
            onChange={date => {
              setMeeting({
                ...meeting,
                start: date._d
              });
            }}
            label="Start time"
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
            className="md-form"
            onSubmit={async e => {
              e.preventDefault();
              await searchParticipants(searchTerm);
              toggleSearchModal();
            }}
          >
            <input
              className="form-control form-control-sm w-75"
              type="text"
              placeholder="Search Participants"
              aria-label="Search Participants"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <MDBBtn
              color="primary"
              size="sm"
              onClick={async e => {
                e.preventDefault();
                await searchParticipants(searchTerm);
                toggleSearchModal();
              }}
            >
              <MDBIcon icon="search" />
            </MDBBtn>
          </MDBFormInline>
          {displayParticipants && <p>Participants: {displayParticipants}</p>}
          <SearchResults
            showSearchResults={showSearchResults}
            participants={participants}
            setParticipants={setParticipants}
            toggleSearchModal={toggleSearchModal}
            searchResults={searchResults}
            setSearchTerm={setSearchTerm}
            participantsDisplay={participantsDisplay}
          />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn
            color="secondary"
            onClick={e => {
              setMeeting({ title: "", start: Date.now() });
              setDisplayParticipants("");
              props.toggle();
            }}
          >
            Close
          </MDBBtn>
          {meeting.id && (
            <MDBBtn
              color="red"
              onClick={e => {
                props.deleteMeeting(meeting);
              }}
            >
              Delete
            </MDBBtn>
          )}
          <MDBBtn color="primary" onClick={e => submitMeeting(e)}>
            Save changes
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.firebase.profile
  };
};

export default connect(mapStateToProps)(MeetingModal);
