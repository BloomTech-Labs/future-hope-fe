import React from "react";
// import { MDBBtn } from "mdbreact";
// import { MDBInput } from "mdbreact";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { Calendar } from "@fullcalendar/core";

export default class MeetingDetails extends React.Component {
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
        // Create a meeting details form allowing the editing of color, time , border color and title of the meeting
        // For a later release...
          return (
                 <div class="MeetingDetails-main">             
                 </div>);
      }
}