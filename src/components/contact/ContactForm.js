import React, { useState } from 'react';
import "../styles/ContactForm.scss";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";

// const[text, setText] = useState("");


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'Name', email: 'email@example.com', message: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  render() {
    return (
      <div className="contactform-container">
        <MDBCard>
          <MDBCardBody>
            <form
            >
              <MDBInput
                type="text"
                name="name"
                label="Name"
              />
              <MDBInput
                type="email"
                name="email"
                label="Email"
              />
            </form>
          </MDBCardBody>

          <MDBInput
            type="textarea"
            label="Message..."
            name="message"
            rows="5"
          // value={this.state.message}
          />
        </MDBCard>
        <div>
          <MDBBtn
            type="submit"
          > Submit</MDBBtn>
        </div>
      </div >
    )
  }

  handleChange(e) {
    this.setState({ feedback: e.target.value })
  }

  handleSubmit(e) {
    e.target.reset();
    const templateId = 'template_id';

    this.sendFeedback(templateId, { message_html: this.state.feedback, from_name: this.state.name, reply_to: this.state.email })
  }

  sendFeedback(templateId, variables) {
    window.emailjs.send(
      'gmail', templateId,
      variables
    ).then(res => {
      console.log('Message sent!')
    })
      .catch(err => console.error('error occured', err))
  }
}

// export default ContactForm

  // const ContactForm = () => {
  //     const [formData, setFormData] = useState({})

  //     const updateInput = e => {
  //         setFormData({
  //             ...formData,
  //             [e.target.name]: e.target.value,
  //         })
  //     }
  //     const handleSubmit = event => {
  //         event.preventDefault()
  //         sendEmail()
  //         setFormData({
  //             name: '',
  //             email: '',
  //             message: '',
  //         })
  //     }
  //     const sendEmail = () =>{
  //         Axios.post(
  //             '', formData
  //         )
  //         .then(res =>{
  //             db.collection('emails').add({
  //             name: formData.name,
  //             email: formData.email,
  //             message: formData.message,
  //         })
  //     })
  //     .catch(error => {
  //         console.log(error)
  //     })
  // }

  // return(
  //     <>
  //     <form onSubmit={handleSubmit}>
  //         <input
  //             type="text"
  //             name="name"
  //             placeholder="Name"
  //             onChange={updateInput}
  //             value={formData.name || ''}
  //             />
  //             <input
  //             type="email"
  //             name="email"
  //             placeholder="Email"
  //             onChange={updateInput}
  //             value={formData.email ||''}
  //             />
  //             <textarea
  //             type="text"
  //             name="message"
  //             placeholder="Message..."
  //             onChange={updateInput}
  //             value={formData.message ||''}
  //             > </textarea>
  //             <button type="submit">Submit</button>
  //             </form>
  //             </>
  //     )
  // }

