import React, { Component } from 'react';

import Icon from './common/icon';

export class FormInput extends Component {
    render() {
        const { className, title, type, placeholder, input, onKeyUp } = this.props;
        return (
            <div className={`${className} form-input`}>
                <label className='form-input__label'>{title}</label>
                <input className='form-input__input' type={type} placeholder={placeholder} {...input} onKeyUp={event => onKeyUp ? onKeyUp(event) : f => f} />
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
                    <select className='form-select__input-container__input' {...input}>
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
            selectedIndex: -1,
            lastIndex: -1
        }
    }

    toggleSelectSugestion(indexToChange) {
        const { selectedIndex } = this.state;
        const element = document.querySelectorAll('.form-list__input-container__suggestions__suggestion')[indexToChange];
        if(selectedIndex !== -1) {
            const elementToRemoveClass = document.querySelectorAll('.form-list__input-container__suggestions__suggestion')[selectedIndex];
            elementToRemoveClass.classList.remove('selected')
        }
        element.classList.add('selected');
        this.setState({selectedIndex: indexToChange});
    }

    generateSuggestion(list) {
        return (
            list.map((item, index) => {
                return <div key={index} className='form-list__input-container__suggestions__suggestion' onClick={() => this.selectSuggestion(item)} onMouseEnter={() => this.toggleSelectSugestion(index)}>{item}</div>
            })
        )
    }

    selectSuggestion(suggestion) {
        document.querySelector('.form-list__input-container__input').value = suggestion;
        document.querySelector('.form-list__input-container__suggestions').classList.remove('active');
    }

    handleKeyPress(event, fields) {
        const inputValue = event.target.value;
        const { suggestion, options } = this.props;
        if(event.key === 'Enter') {
            if (event.target.value !== '') {
                const suggestionElement = document.querySelector('.form-list__input-container__suggestions');
                const suggestionItemElement = document.querySelectorAll('.form-list__input-container__suggestions__suggestion.selected');
                if(suggestionElement.classList.contains('active') && suggestionItemElement.length > 0){
                    suggestionItemElement[0].click();
                }
                else {
                    document.querySelector('.form-list__input-container__suggestions').classList.remove('active');
                    const { objectName, objectValueInput } = options;
                    var objectToAdd = {}
    
                    objectName.map((name, index) => {
                        if(objectValueInput[index] === null) {
                            objectToAdd[name] = event.target.value
                        }
                        else {
                            objectToAdd[name] = document.querySelector(`${objectValueInput[index]} input`).value
                            document.querySelector(`${objectValueInput[index]} input`).value = ''
                        }
                    })
    
                    fields.push(objectToAdd);
                    event.target.value = '';
                }
            }
        }
        else if(event.key === 'ArrowDown') {
            const { selectedIndex, lastIndex } = this.state;
            let indexToChange = selectedIndex + 1;
            if(indexToChange > lastIndex) {
                indexToChange = lastIndex
            }
            this.toggleSelectSugestion(indexToChange);
        }
        else if(event.key === 'ArrowUp') {
            const { selectedIndex } = this.state;
            let indexToChange = selectedIndex - 1;
            if(indexToChange < 0) {
                indexToChange = 0
            }
            this.toggleSelectSugestion(indexToChange);
        }
        else if (inputValue.length >= 2) {
            let suggestionList = suggestion.filter(suggestion => {
                return suggestion.toLowerCase().includes(inputValue.toLowerCase());
            });
            const lastIndex = suggestionList.length - 1;
            this.setState({suggestionList, lastIndex})
            document.querySelector('.form-list__input-container__suggestions').classList.add('active');
        }
        else {
            document.querySelector('.form-list__input-container__suggestions').classList.remove('active');
        }
    }

    render() {
        const { className, placeholder, title, fields, input, options } = this.props;
        return (
            <div className={`${className} form-list ${options.type === 'modal' ? 'form-list-modal' : ''}`}>
                <div className='form-list__input-container'>
                    <label className='form-list__input-container__label'>{title}</label>
                    <input autoComplete='off' className='form-list__input-container__input' type='text' placeholder={placeholder} onKeyUp={(event) => this.handleKeyPress(event, fields)} {...input}/>
                    <div className='form-list__input-container__suggestions'>
                        {this.generateSuggestion(this.state.suggestionList)}
                    </div>
                </div>
                <div className='form-list__item-list'>
                    {   
                        fields.length !== 0 ?
                        fields.getAll().map((item, index) => {
                            const { objectName, objectValueInput } = options;
                            return (
                                <div key={index} className='form-list__item-list__item-container'>
                                    {
                                        objectName.map((name, index) => {
                                            return <div key={index} className='form-list__item-list__item-container__item'>{item[name]}</div>
                                        })
                                    }
                                </div>
                            )
                        })
                        :
                        ''
                    }
                </div>
            </div>
        )
    }
}