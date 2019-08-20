import React from 'react'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { login } from '../../actions/auth.js';

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    render() {
        return(
            <div className='login-container'>
                <h3>Please Login</h3>
                <TextField
                    required
                    id='standard-required-email-input'
                    label='Email'
                    margin='normal'
                    type='email'
                    name='email'
                    autoComplete='email'
                />
                <TextField
                    required
                    id='standard-password-input'
                    label='Password'
                    margin='normal'
                    type='password'
                    name='password'
                />
            </div>
        )
    }
}

export default Login