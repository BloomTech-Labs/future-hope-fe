import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from "@fullcalendar/core";

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
          return (
                 <div class="MeetingDetails-main">

                 </div>);
      }
}