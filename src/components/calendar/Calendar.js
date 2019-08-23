import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Button from "@material-ui/core/Button";
import flatpickr from 'flatpickr';
import './flatpickr.min.css';
import './flatpickr.css';
import swal from 'sweetalert';

import "./main.scss";

export default class Calendar extends React.Component {
  calendarComponentRef = React.createRef();    
  state = {
    calendarWeekends: true,    
    displayPicker: true,
    events: []
  };

componentDidMount = () => {
  // Set state from the prop events
  this.setState({
    ...this.state,
    events: this.props.events
  });
}

render() {       
        return (      
      <div className="demo-app" style={{ marginTop: 100 }}>        
        <div className="demo-app-top">
          <Button onClick={this.toggleWeekends}>toggle weekends</Button>&nbsp;
          <Button id="futureButton" onClick={this.gotoPast}>Schedule future appointment</Button>
          &nbsp;
        </div>
        <div className="demo-app-calendar">          
          <input type="text" id="datepicker" placeholder="Set meeting time..." />
          <FullCalendar
            defaultView="dayGridMonth"
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
            allDayDefault={false}     
          />
        </div>        
      </div>
    );    
  }

  handleEventClick = (info) => {
    console.log(info.event.title);
  }

  toggleWeekends = () => {
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
    const fp = flatpickr(myInput, {position: "below", enableTime: true, noCalendar: false, dateFormat: "H:i", timeZone: "local", onClose: () => {  
      // If the user canceled the picker the dates will be empty and there is nothing to do 
      if (fp.selectedDates.length === 0) {
        return;
      }
        swal({
          title: "Schedule Meeting?",
          text: "Meeting will be added to the calendar!",
          icon: "warning",
          buttons: true,
          dangerMode: false,
        })
        .then((scheduleAppointment) => {
          if (scheduleAppointment) {
            // If the user confirmed the scheduled meeting we navigate to the date and update state               
            calendarApi.gotoDate(fp.selectedDates[0]);                  
            this.setState({
              ...this.state,
                events: [...this.state.events, {title: 'Meeting', start: fp.selectedDates[0]}]
            });          
            swal("Meeting has been added to the calendar!", {
              icon: "success",
            });
          } else {
            swal("Cancelled, your meeting has not been set!");
          }
        });  
    }});
    fp.open();        
  };

  

  handleDateClick = arg => {
    // Display only the time component of flatpickr so the user can select the meeting start time.  Like above the work is done in the 
    // onClose function of flatickr as execution does not halt after the time picker is opened to allow the user to select a date.
    const myInput = document.querySelector("#datepicker");
    const fp = flatpickr(myInput, {position: "below", enableTime: true, noCalendar: true, dateFormat: "H:i", timeZone: "local", onClose: () => {       
      // TODO: Need to setup an onChange event to verify the user selected a time and didn't click away...      
      swal({
        title: "Schedule Meeting?",
        text: "Meeting will be added to the calendar!",
        icon: "warning",
        buttons: true,
        dangerMode: false,
      })
      .then((scheduleAppointment) => {
        if (scheduleAppointment) {
          // If the user confirms the meeting add the start time to the date object and update  state with the new meeting
          let meetingDate = new Date(arg.date.getFullYear(), arg.date.getMonth(), arg.date.getDate(), fp.selectedDates[0].getHours(), fp.selectedDates[0].getMinutes(), 0, 0);          
          this.setState({
            ...this.state,
              events: [...this.state.events, {title: 'Meeting', start: meetingDate}]
          });          
          swal("Meeting has been added to the calendar!", {
            icon: "success",
          });
        } else {
          swal("Cancelled, your meeting has not been set!");
        }
      });
  
    }});
    fp.open();        
  };

}
