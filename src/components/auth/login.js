import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { Heading } from '../common/headings';
import { PlaceholderImage } from '../common/image';

class Login extends Component {
    render() {
        return(
            <div className='login'>
                <div className='login__background'>
                    <PlaceholderImage className='login__background__image' width='1920' height='1080' />
                </div>
                <div className='login__form'>
                    <Heading className='login__form__heading' text='Login'/>
                </div>
            </div>
        )
    }
}

Login = reduxForm({
    form: 'Login'
})(Login);

export default Login;