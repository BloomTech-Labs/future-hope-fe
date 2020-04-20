import React, {useState} from "react";
import {Axios, db} from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({})

    const updateInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = event => {
        event.preventDefault()
        sendEmail()
        setFormData({
            name: '',
            email: '',
            message: '',
        })
    }
    const sendEmail = () =>{
        Axios.post(
            '', formData
        )
        .then(res =>{
            db.collection('emails').add({
            name: formData.name,
            email: formData.email,
            message: formData.message,
        })
    })
    .catch(error => {
        console.log(error)
    })
}

return(
    <>
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={updateInput}
            value={formData.name || ''}
            />
            <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={updateInput}
            value={formData.email ||''}
            />
            <textarea
            type="text"
            name="message"
            placeholder="Message..."
            onChange={updateInput}
            value={formData.message ||''}
            > </textarea>
            <button type="submit">Submit</button>
            </form>
            </>
    )
}
export default ContactForm
 