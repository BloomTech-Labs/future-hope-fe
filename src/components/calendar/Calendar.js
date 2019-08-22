import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
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
  // Set state to the prop events
  this.setState({
    ...this.state,
    events: this.props.events
  });
}

render() {       
        return (      
      <div className="demo-app" style={{ marginTop: 100 }}>        
        <div className="demo-app-top">
          <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
          <button id="futureButton" onClick={this.gotoPast}>Schedule future appointment</button>
          &nbsp; (also, click a date/time to add an event)
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
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.events}
            dateClick={this.handleDateClick}
          />
        </div>        
      </div>
    );    
  }

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends
    });
  };

  gotoPast = () => { 
    let calendarApi = this.calendarComponentRef.current.getApi();  
    // TODO: Open the datepicker to choose a date to navigate to...  
    const myInput = document.querySelector("#futureButton");
    const fp = flatpickr(myInput, {position: "below", enableTime: true, noCalendar: false, dateFormat: "H:i", timeZone: "local", onClose: () => {           
        calendarApi.gotoDate(fp.selectedDates[0]);
        swal({
          title: "Schedule Meeting?",
          text: "Meeting will be added to the calendar!",
          icon: "warning",
          buttons: true,
          dangerMode: false,
        })
        .then((scheduleAppointment) => {
          if (scheduleAppointment) {
            // Add the date and time selected to the scheduled events                                
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
    const myInput = document.querySelector("#datepicker");
    const fp = flatpickr(myInput, {position: "below", enableTime: true, noCalendar: true, dateFormat: "H:i", timeZone: "local", onClose: () => {       
      swal({
        title: "Schedule Meeting?",
        text: "Meeting will be added to the calendar!",
        icon: "warning",
        buttons: true,
        dangerMode: false,
      })
      .then((scheduleAppointment) => {
        if (scheduleAppointment) {
          // Add the date and time selected to the scheduled events          
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
