import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import { FormInput, FormButton } from '../formFields';

import { Heading } from '../common/headings';
import { PlaceholderImage } from '../common/image';

class LoginForm extends Component {
    render() {
        const { className, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit} className={`${className} login-form`}>
                <Field className='login-form__email' type='email' name='email' title='Email' placeholder='Email' component={FormInput}/>
                <Field className='login-form__password' type='password' name='password' title='Password' placeholder='Password' component={FormInput}/>
                <Field className='login-form__login' type='submit' name='login' title='Login' onClick={() => console.log('submiting')} component={FormButton}/>

            </form>
        )
    }
}

class Login extends Component {
    onSubmit = (fields) => {
        console.log(fields);
    }

    render() {
        return (
            <div className='login'>
                <div className='login__background'>
                    <PlaceholderImage className='login__background__image' width='1920' height='1080' />
                </div>
                <div className='login__content'>
                    <Heading className='login__content__heading' text='Login'/>
                    <LoginForm onSubmit={this.onSubmit} className='login__content__form' />
                </div>
            </div>
        )
    }
}

LoginForm = reduxForm({
    form: 'Login'
})(LoginForm);

export default Login;