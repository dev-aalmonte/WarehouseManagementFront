import React, { Component } from 'react';

import Icon from './common/icon';

export class FormInput extends Component {
    render() {
        const { className, title, type, placeholder, input } = this.props;
        return (
            <div className={`${className} form-input`}>
                <label className='form-input__label'>{title}</label>
                <input className='form-input__input' type={type} placeholder={placeholder} {...input} />
            </div>
        )
    }
}

export class FormButton extends Component {
    render() {
        const { className, title, type, onClick, input } = this.props;
        return (
            <div className={`${className} form-button`}>
                <button type={type} {...input} onClick={onClick}>{title}</button>
            </div>
        )
    }
}

export class FormSmallButton extends Component {
    render() {
        const { className, icon, type, onClick, input } = this.props;
        return (
            <div className={`${className} form-small-button`}>
                <button type={type} {...input} onClick={onClick}><Icon className='form-small-button__icon' icon={icon}/></button>
            </div>
        )
    }
}