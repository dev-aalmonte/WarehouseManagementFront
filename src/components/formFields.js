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

export class FormSelect extends Component {
    openSelect = () => {
        console.log("Goes here!");
    }

    render() {
        const { className, title, options, placeholder, input } = this.props;
        return (
            <div className={`${className} form-select`}>
                <label className='form-select__label'>{title}</label>
                <div className='form-select__input-container'>
                    <select className='form-select__input-container__input' value='' {...input}>
                        <option value='' disabled>{placeholder}</option>
                        {
                            options.map((option, index) => {
                                return <option key={index} value={option.key}>{option.value}</option>
                            })
                        }
                    </select>
                    <Icon onClick={this.openSelect} className='form-select__input-container__icon' icon='angle-down'/>
                </div>
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

export class FormList extends Component {
    constructor(props){
        super(props);

        this.state = {
            suggestionList: [],
        }
    }

    generateSuggestion(list) {
        return (
            list.map(item =>{
                return <div className='form-list__input-container__suggestions__suggestion' onClick={() => this.selectSuggestion(item)}>{item}</div>
            })
        )
    }

    selectSuggestion(suggestion) {
        document.querySelector('.form-list__input-container__input').value = suggestion;
        document.querySelector('.form-list__input-container__suggestions').classList.remove('active');
    }

    handleKeyPress(event, fields) {
        const inputValue = event.target.value;
        const { suggestion } = this.props;
        if(event.key === 'Enter') {
            if (event.target.value !== '') {
                document.querySelector('.form-list__input-container__suggestions').classList.remove('active');
                fields.push({"product": event.target.value, "quantity": 1});
                event.target.value = '';
            }
        }
        else if (inputValue.length >= 2) {
            let suggestionList = suggestion.filter(suggestion => {
                return suggestion.toLowerCase().includes(inputValue.toLowerCase());
            });
            this.setState({suggestionList})
            document.querySelector('.form-list__input-container__suggestions').classList.add('active');
        }
        else {
            document.querySelector('.form-list__input-container__suggestions').classList.remove('active');
        }
    }

    render() {
        const { className, placeholder, title, fields, input } = this.props;
        return (
            <div className={`${className} form-list`}>
                <div className='form-list__input-container'>
                    <label className='form-list__input-container__label'>{title}</label>
                    <input autoComplete='off' className='form-list__input-container__input' type='text' name='product-name' placeholder={placeholder} onKeyUp={(event) => this.handleKeyPress(event, fields)} {...input}/>
                    <div className='form-list__input-container__suggestions'>
                        {this.generateSuggestion(this.state.suggestionList)}
                    </div>
                </div>
                <div className='form-list__item-list'>
                    {
                        fields.map((product, index) => {
                            return(<div key={index} className='form-list__item-list__item-container'>
                                <div className='form-list__item-list__item-container__item'>value 1</div>
                                <div className='form-list__item-list__item-container__item'>value 2</div>
                                <div className='form-list__item-list__item-container__item'>value 3</div>
                            </div>)
                        })
                    }
                </div>
            </div>
        )
    }
}