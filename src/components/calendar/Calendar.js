import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import flatpickr from "flatpickr";
import "./flatpickr.min.css";
import "./flatpickr.css";
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
    showModal: false
  };

  componentDidMount = async () => {
    const uid = this.props.user.uid;
    let events = [];
    const meetingsRef = await firestore.collection("meetings");
    // finds all meeting docs with matching UID and pushes each to the events array and then sets array in state
    const userMeetings = await meetingsRef
      .where("participantUIDs", "array-contains", uid)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot);
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          const meetingTime = doc.data().meetingTime.seconds * 1000;
          events.push({
            title: doc.data().title,
            start: new Date(meetingTime)
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

  render() {
    return (
      <div className='demo-app' style={{ marginTop: 100 }}>
        <div className='demo-app-top'>
          <MDBBtn onClick={this.toggleWeekends}>toggle weekends</MDBBtn>&nbsp;
          <MDBBtn id='futureButton' onClick={this.gotoPast}>
            Schedule future appointment
          </MDBBtn>
          &nbsp;
        </div>
        <div className='demo-app-calendar'>
          <input
            type='text'
            id='datepicker'
            placeholder='Set meeting time...'
          />
          <FullCalendar
            defaultView='dayGridMonth'
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            editable={true}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.events}
            dateClick={this.handleDateClick}
            eventClick={this.handleEventClick}
            eventDrop={this.handleEventDrop}
            allDayDefault={false}
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <MeetingModal
              toggle={this.toggleModal}
              showModal={this.state.showModal}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
    );
  }

  handleEventDrop = info => {
    swal({
      title: "Change Meeting Date?",
      text: `Meeting will be changed to ${info.event.start}`,
      icon: "warning",
      buttons: true,
      dangerMode: false
    }).then(changeDate => {
      console.log("event", info.event);
      console.log("new date", changeDate);
      if (changeDate) {
        let newEvents = this.state.events.map(e => {
          if (e.start.getTime() === info.oldEvent.start.getTime()) {
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
        info.view.calendar.removeAllEvents();
        newEvents.forEach(e => {
          info.view.calendar.addEvent(e);
        });
        swal(`Meeting date has been changed to ${info.event.start}`, {
          icon: "success"
        });
      } else {
        swal("Cancelled, your meeting has not been changed!");
      }
    });
  };

  handleEventClick = info => {
    swal({
      text: "Set Meeting Name",
      content: "input",
      button: {
        text: "Submit!",
        closeModal: true
      }
    }).then(name => {
      let newEvents = this.state.events.map(e => {
        if (e.start.getTime() === info.event.start.getTime()) {
          if (name != null) {
            e.title = name;
          }
          return e;
        } else {
          return e;
        }
      });
      this.setState({
        ...this.state,
        events: newEvents
      });
      info.view.calendar.removeAllEvents();
      newEvents.forEach(e => {
        info.view.calendar.addEvent(e);
      });

      swal({
        title: "Would you like to change the date as well?",
        text: `Current date is ${info.event.start}`,
        icon: "warning",
        buttons: true,
        dangerMode: false
      }).then(changeDate => {
        if (changeDate) {
          const myInput = document.querySelector("#futureButton");
          const fp = flatpickr(myInput, {
            position: "below",
            enableTime: true,
            noCalendar: false,
            dateFormat: "H:i",
            timeZone: "local",
            onClose: () => {
              // If the user canceled the picker the dates will be empty and there is nothing to do
              if (fp.selectedDates.length === 0) {
                return;
              }

              newEvents = this.state.events.map(e => {
                if (e.start.getTime() === info.event.start.getTime()) {
                  e.start = fp.selectedDates[0];
                  return e;
                } else {
                  return e;
                }
              });
              this.setState({
                ...this.state,
                events: newEvents
              });
              info.view.calendar.removeAllEvents();
              newEvents.forEach(e => {
                info.view.calendar.addEvent(e);
              });
            }
          });
          fp.open();
        }
      });
    });
  };

  toggleWeekends = () => {
    console.log(this.state.events);
    this.setState({
      // Update state if the displaying of weekends is toggled on/off
      calendarWeekends: !this.state.calendarWeekends
    });
  };

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    // Displays a datetime picker to set a future meeting
    const myInput = document.querySelector("#futureButton");
    // Had to put the confirmation and state update in the onClose callback as execution continues even after the flatpickr is displayed
    const fp = flatpickr(myInput, {
      position: "below",
      enableTime: true,
      noCalendar: false,
      dateFormat: "H:i",
      timeZone: "local",
      onClose: () => {
        // If the user canceled the picker the dates will be empty and there is nothing to do
        if (fp.selectedDates.length === 0) {
          return;
        }
        swal({
          title: "Schedule Meeting?",
          text: "Meeting will be added to the calendar!",
          icon: "warning",
          buttons: true,
          dangerMode: false
        }).then(scheduleAppointment => {
          if (scheduleAppointment) {
            // If the user confirmed the scheduled meeting we navigate to the date and update state
            calendarApi.gotoDate(fp.selectedDates[0]);
            this.setState({
              ...this.state,
              events: [
                ...this.state.events,
                { title: "Meeting", start: fp.selectedDates[0] }
              ]
            });
            swal("Meeting has been added to the calendar!", {
              icon: "success"
            });
          } else {
            swal("Cancelled, your meeting has not been set!");
          }
        });
      }
    });
    fp.open();
  };

  handleDateClick = arg => {
    // Display only the time component of flatpickr so the user can select the meeting start time.  Like above the work is done in the
    // onClose function of flatickr as execution does not halt after the time picker is opened to allow the user to select a date.
    console.log("handleDateClick triggered");
    this.toggleModal();
    //   const myInput = document.querySelector("#datepicker");
    //   const fp = flatpickr(myInput, {
    //     position: "below",
    //     enableTime: true,
    //     noCalendar: true,
    //     dateFormat: "H:i",
    //     timeZone: "local",
    //     onClose: () => {
    //       swal({
    //         title: "Schedule Meeting?",
    //         text: "Meeting will be added to the calendar!",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: false
    //       }).then(scheduleAppointment => {
    //         if (scheduleAppointment) {
    //           // If the user confirms the meeting add the start time to the date object and update  state with the new meeting
    //           let meetingDate = new Date(
    //             arg.date.getFullYear(),
    //             arg.date.getMonth(),
    //             arg.date.getDate(),
    //             fp.selectedDates[0].getHours(),
    //             fp.selectedDates[0].getMinutes(),
    //             0,
    //             0
    //           );
    //           this.setState({
    //             ...this.state,
    //             events: [
    //               ...this.state.events,
    //               { title: "Meeting", start: meetingDate }
    //             ]
    //           });
    //           swal("Meeting has been added to the calendar!", {
    //             icon: "success"
    //           });
    //         } else {
    //           swal("Cancelled, your meeting has not been set!");
    //         }
    //       });
    //     }
    //   });
    //   fp.open();
  };
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
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
