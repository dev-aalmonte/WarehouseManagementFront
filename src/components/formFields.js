import React, { Component } from 'react';

import Icon from './common/icon';

export class FormInput extends Component {
    render() {
        const { className, title, type, placeholder, input, onKeyUp} = this.props;
        return (
            <div className={`${className} form-input`}>
                <label className='form-input__label'>{title}</label>
                <input className='form-input__input' type={type} placeholder={placeholder} {...input} onKeyUp={event => onKeyUp ? onKeyUp(event) : f => f} />
            </div>
        )
    }
}

export class FormQuantity extends Component {
    render() {
        const { className, title, placeholder, input, onKeyUp, min, max } = this.props;
        return (
            <div className={`${className} form-quantity`}>
                <label className='form-quantity__label'>{title}</label>
                <input className='form-quantity__input' type="number" min={min ? min : 0} max={max ? max : 99} placeholder={placeholder} {...input} onKeyUp={event => onKeyUp ? onKeyUp(event) : f => f} />
            </div>
        )
    }
}

export class FormMoney extends Component {
    constructor(props){
        super(props);

        this.state = {
            unformattedMoney: '0',
            formattedMoney: ''
        }
    }

    formatNumber(number){
        let formattedMoneyReverse = number.split('').reverse();
        return formattedMoneyReverse.map((value, index) => {
            if(formattedMoneyReverse.length <= 2 && index == formattedMoneyReverse.length - 1)
                return `.${value}`;

            if(index == 2)
                return `${value}.`;

            if((index - 2) % 3 == 0)
                return `${value},`;

            return value;
        }).reverse().join('');
        
    }

    onKeyUp(event) {
        if(event.key >= 0 && event.key <= 9 && event.which != 8 && isNaN(String.fromCharCode(event.which))){
            const unformattedMoney = this.state.unformattedMoney == '0' ? event.key : `${this.state.unformattedMoney}${event.key}`;
            const formattedMoney = this.formatNumber(unformattedMoney);
            this.setState({unformattedMoney, formattedMoney});
        }
        else if(event.key == "Backspace") {
            let unformattedMoney = this.state.unformattedMoney;
            unformattedMoney = unformattedMoney.split('');
            unformattedMoney.pop();
            unformattedMoney = unformattedMoney.join('');
            const formattedMoney = this.formatNumber(unformattedMoney);
            this.setState({unformattedMoney, formattedMoney});
        }
    }

    render() {
        const { className, title, placeholder, input } = this.props;
        return (
            <div className={`${className} form-money`}>
                <label className='form-money__label'>{title}</label>
                <div className='form-money__input-container'>
                    <Icon className='form-money__input-container__icon' icon="dollar-sign" />
                    <input className='form-money__input-container__input' type='text' placeholder={placeholder} {...input} onKeyUp={event => this.onKeyUp(event)} value={this.state.formattedMoney} />
                </div>
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
                            options ?
                            options.map((option, index) => {
                                return <option key={index} value={option.key}>{option.value}</option>
                            })
                            :
                            ""
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
            selectedSuggestion: null,
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
        const options = this.props;
        const keyName = options.suggestion.keyName ? options.suggestion.keyName : 'name';
        return (
            list.map((item, index) => {
                if(typeof item === 'string'){
                    return <div key={index} className='form-list__input-container__suggestions__suggestion' onClick={() => this.selectSuggestion(item)} onMouseEnter={() => this.toggleSelectSugestion(index)}>{item}</div>
                }
                else {
                    return <div key={index} className='form-list__input-container__suggestions__suggestion' onClick={() => this.selectSuggestion(item)} onMouseEnter={() => this.toggleSelectSugestion(index)}>{item[keyName]}</div>
                }
            })
        )
    }

    selectSuggestion(suggestion) {
        const options = this.props;
        const keyName = options.suggestion.keyName ? options.suggestion.keyName : null;
        this.setState({selectedSuggestion: suggestion});

        document.querySelector('.form-list__input-container__input').value = keyName ? suggestion[keyName] : suggestion;
        document.querySelector('.form-list__input-container__suggestions').classList.remove('active');
    }

    handleKeyPress(event, fields) {
        const inputValue = event.target.value;
        const { suggestion, options } = this.props;

        options.suggestion.event.onKeyUp(event);

        if(inputValue.length >= 2 && event.key === 'Enter') {
            if (event.target.value !== '') {
                const suggestionElement = document.querySelector('.form-list__input-container__suggestions');
                const suggestionItemElement = document.querySelectorAll('.form-list__input-container__suggestions__suggestion.selected');
                if(suggestionElement.classList.contains('active') && suggestionItemElement.length > 0){
                    suggestionItemElement[0].click();
                }
                else if(!suggestionElement.classList.contains('active')) {
                    document.querySelector('.form-list__input-container__suggestions').classList.remove('active');
                    const { objectName, objectValueInput } = options;
                    var objectToAdd = {}
    
                    objectName.map((name, index) => {
                        if(objectValueInput[index] === null) {
                            objectToAdd[name] = this.state.selectedSuggestion ? this.state.selectedSuggestion : event.target.value;
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
                if(typeof suggestion === 'string'){
                    return suggestion.toLowerCase().includes(inputValue.toLowerCase());
                }
                else {
                    const keyName = options.suggestion.keyName ? options.suggestion.keyName : 'name';
                    return suggestion[keyName].toLowerCase().includes(inputValue.toLowerCase());
                }
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
                                        objectName ?
                                        objectName.map((name, index) => {
                                            const options = this.props;
                                            const keyName = options.suggestion.keyName ? options.suggestion.keyName : 'name';

                                            if(typeof item[name] === 'string'){
                                                return <div key={index} className='form-list__item-list__item-container__item'>{item[name]}</div>
                                            }
                                            else {
                                                return <div key={index} className='form-list__item-list__item-container__item'>{item[name][keyName]}</div>
                                            }
                                        }):
                                        <div key={index} className='form-list__item-list__item-container__item'>{item}</div>
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