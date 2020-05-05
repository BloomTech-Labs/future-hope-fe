import React, { useState } from 'react';
import * as emailjs from 'emailjs-com';
import "../styles/ContactForm.scss";
import {
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user_name: '', user_email: '', message: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    emailjs.sendForm('gmail', 'template_VLC4TuFz', e.target, 'user_4z7SOwP1t76jrtCUwnSHT').then((res) => {
      console.log(res.text)
    }, (error) => {
      console.log(error.text)
    });
    this.setState({ user_name: '', user_email: '', message: '' })
  }

  render() {
    return (
      <div className="contactform-container">
        <form onSubmit={this.handleSubmit}>
          <MDBCard>
            <MDBCardBody>
              <MDBInput
                type="text"
                name="user_name"
                label="Name"
                value={this.state.user_name}
                onChange={this.handleChange}
              />
              <MDBInput
                type="email"
                name="user_email"
                label="Email"
                value={this.state.user_email}
                onChange={this.handleChange}
              />
            </MDBCardBody>
            <div className='contact-message'>
              <MDBInput
                type="textarea"
                label="Message..."
                name="message"
                value={this.state.message}
                onChange={this.handleChange}
                rows="5"
              />
            </div>
          </MDBCard>
          <div>
            <MDBBtn color="warning"
              type="submit"
            > <span className="aButton">Submit</span></MDBBtn>
          </div>
        </form>
      </div >
    )
  }
}

