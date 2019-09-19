import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { MDBBtn } from "mdbreact";
import swal from "@sweetalert/with-react";
import { connect } from "react-redux";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { firestore, auth } from "../../config/fbConfig.js";
import { userStore } from "../../actions/auth.js";
import MeetingModal from "./MeetingModal";

import "../auth/Login.scss";
import "./main.scss";

class Calendar extends React.Component {
  calendarComponentRef = React.createRef();
  state = {
    calendarWeekends: true,
    displayPicker: true,
    meetingParticipant: "",
    events: [],
    changedEvent: {},
    showModal: false,
    clickedMeeting: {
      title: "",
      start: "",
      participantUIDs: "",
      participantNames: ""
    }
  };

  componentDidMount = async () => {
    const uid = JSON.parse(localStorage.getItem("UID")) || auth.currentUser.uid;
    let events = [];
    const meetingsRef = firestore.collection("meetings");
    // finds all meeting docs with matching UID and pushes each to the events array and then sets array in state
    await meetingsRef
      .where("participantUIDs", "array-contains", uid)
      .get()
      .then(querySnapshot => {
        // console.log(querySnapshot);
        querySnapshot.forEach(doc => {
          // console.log(doc.data());
          const start = doc.data().start.seconds * 1000;
          events.push({
            title: doc.data().title,
            start: new Date(start),
            id: doc.data().id
          });
        });
      });
    this.setState({
      events: events
    });
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  addMeeting = async meeting => {
    const calendarApi = this.calendarComponentRef.current.getApi();
    let meetings = this.state.events;
    console.log("meeting object", meeting);
    //* add meeting to firestore
    try {
      const meetingRef = firestore.collection("meetings").doc();
      //* gets new meeting ID and inserts it into the record as uid
      meeting.id = meetingRef.id;
      await meetingRef.set(meeting);
      //* update old meetings array with new meeting
      meetings.push(meeting);
      this.setState({
        events: meetings
      });
      swal(`Your meeting has been created`, {
        icon: "success"
      });
      calendarApi.addEvent(meeting);
    } catch (err) {
      swal("There was a server error, your meeting could not be created", {
        icon: "warning"
      });
    }
    //* adds new event to the calendar directly via API call
  };

  editMeeting = async meeting => {
    console.log("meeting arg into editMeeting", meeting);
    try {
      //* updating meeting in firebase
      const meetingRef = firestore.collection("meetings").doc(meeting.id);
      await meetingRef.update(meeting);
      //* edit event in events array
      let events = this.state.events.map(event => {
        if (event.id === meeting.id) {
          event = meeting;
        }
        return event;
      });
      console.log("events", events);
      // //* set state with new events array
      this.setState({
        ...this.state,
        events: events,
        clickedMeeting: {
          title: "",
          start: "",
          participantUIDs: "",
          participantNames: ""
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  deleteMeeting = async meeting => {
    console.log(meeting);
    try {
      await swal({
        title: "Delete Meeting?",
        text: `Are you sure you want to delete this meeting?`,
        icon: "warning",
        buttons: true,
        dangerMode: false
      })
        .then(okToDelete => {
          if (okToDelete) {
            const meetingRef = firestore
              .collection("meetings")
              .doc(meeting.id)
              .delete();
            let events = this.state.events.filter(
              event => event.id !== meeting.id
            );
            this.setState({
              ...this.state,
              events: events,
              clickedMeeting: {
                title: "",
                start: "",
                participantUIDs: "",
                participantNames: ""
              }
            });
            swal(`Your meeting has been deleted`, {
              icon: "success"
            });
          }
        })
        .catch(err => {
          swal("Cancelled, your meeting has not been deleted!");
        });
    } catch (err) {
      swal(`Server error: Your meeting could not be deleted`, {
        icon: "error"
      });
    }
    this.toggleModal();
  };

  render() {
    // console.log("user", this.props.user);
    // console.log("auth", auth.currentUser);
    return (
      <div className='calendar-app'>
        <div className='calendar-app-top'>
          <h1>Schedule a Meeting</h1>
        </div>
        <div className='calendar'>
          <input
            type='text'
            id='datepicker'
            placeholder='Set meeting time...'
          />
          <FullCalendar
            themeSystem='standard'
            defaultView='dayGridMonth'
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            buttonText={{
              today: "Today",
              month: "Month",
              week: "Week",
              day: "Day"
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            editable
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.events}
            dateClick={this.handleDateClick}
            eventClick={this.handleEventClick}
            eventDrop={this.handleEventDrop}
            allDayDefault={false}
            handleWindowResize
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <MeetingModal
              toggle={this.toggleModal}
              showModal={this.state.showModal}
              addMeeting={this.addMeeting}
              clickedMeeting={this.state.clickedMeeting}
              editMeeting={this.editMeeting}
              deleteMeeting={this.deleteMeeting}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
    );
  }

  handleEventDrop = async info => {
    try {
      swal({
        title: "Change Meeting Date?",
        text: `Meeting will be changed to ${info.event.start}`,
        icon: "warning",
        buttons: true,
        dangerMode: false
      })
        .then(async changeDate => {
          console.log("event", info.event);
          console.log("new date", changeDate);
          if (changeDate) {
            //* updating meeting in firebase
            const meetingRef = firestore
              .collection("meetings")
              .doc(info.event.id);
            const newStart = {
              start: info.event.start
            };
            await meetingRef.update(newStart);
            let newEvents = this.state.events.map(e => {
              if (e.start.getTime() === info.oldEvent.start.getTime()) {
                console.log(e);
                e.start = info.event.start;
                return e;
              } else {
                return e;
              }
            });
            this.setState({
              ...this.state,
              events: newEvents
            });
            swal(`Meeting date has been changed to ${info.event.start}`, {
              icon: "success"
            });
          } else {
            //* if cancel is clicked, revert change in calendar API to previous date
            info.revert();
            swal("Cancelled, your meeting has not been changed!");
          }
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  handleEventClick = async info => {
    const meetingRef = firestore.collection("meetings").doc(info.event.id);
    const meeting = meetingRef.get().then(doc => {
      const start = new Date(doc.data().start.seconds * 1000);
      this.setState({
        ...this.state,
        clickedMeeting: {
          ...doc.data(),
          start: start
        }
      });
    });
    this.toggleModal();
  };

  handleDateClick = async arg => {
    console.log("arg.date", arg.date);
    // Display only the time component of flatpickr so the user can select the meeting start time.  Like above the work is done in the
    // onClose function of flatickr as execution does not halt after the time picker is opened to allow the user to select a date.
    let meetingDate = await new Date(
      arg.date.getFullYear(),
      arg.date.getMonth(),
      arg.date.getDate(),
      12,
      0,
      0,
      0
    );
    await this.setState({
      clickedMeeting: {
        start: meetingDate
      }
    });
    this.toggleModal();
  };
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userStore: user => dispatch(userStore(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);

/*
const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.firebase.profile
  };
};

*/
