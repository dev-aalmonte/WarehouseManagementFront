import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import CurrencyInput from 'react-currency-input';
import DropzoneComponent from "react-dropzone-component";

import "../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../node_modules/react-dropzone-component/styles/filepicker.css";

import Icon from './common/icon';

export class FormInput extends Component {
    render() {
        const { className, title, type, placeholder, input, onKeyUp, meta } = this.props;
        if (meta){
            const { touched, error, warning } = meta;
            return (
                <div className={`${className} form-input`}>
                    <label className='form-input__label'>{title} {touched && ((error && <span className="form-input__label__error">{error}</span>) || (warning && <span className="form-input__label__warn">{warning}</span>))}</label>
                    <input className={`form-input__input ${touched && ((error && 'error') || (warning && 'warn'))}`} type={type} placeholder={placeholder} {...input} onKeyUp={event => onKeyUp ? onKeyUp(event) : f => f} />
                </div>
            )
        }
        return (
            <div className={`${className} form-input`}>
                <label className='form-input__label'>{title}</label>
                <input className='form-input__input' type={type} placeholder={placeholder} {...input} onKeyUp={event => onKeyUp ? onKeyUp(event) : f => f} />
                {/* {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))} */}
            </div>
        )
    }
}

export class FormTextArea extends Component {
    render() {
        const { className, title, placeholder, input, onKeyUp, meta} = this.props;
        if(meta) {
            const { touched, error, warning } = meta;
            return (
                <div className={`${className} form-textarea`}>
                    <label className='form-textarea__label'>{title} {touched && ((error && <span className="form-textarea__label__error">{error}</span>) || (warning && <span className="form-textarea__label__warn">{warning}</span>))}</label>
                    <textarea className={`form-textarea__input ${touched && ((error && 'error') || (warning && 'warn'))}`} rows='4' placeholder={placeholder} {...input} onKeyUp={event => onKeyUp ? onKeyUp(event) : f => f}></textarea>
                </div>
            )
        }
        return (
            <div className={`${className} form-textarea`}>
                <label className='form-textarea__label'>{title}</label>
                <textarea className='form-textarea__input' rows='4' placeholder={placeholder} {...input} onKeyUp={event => onKeyUp ? onKeyUp(event) : f => f}></textarea>
            </div>
        )
    }
}

export class FormQuantity extends Component {
    render() {
        const { className, title, placeholder, input, onKeyUp, min, max, meta } = this.props;
        if(meta) {
            const { touched, error, warning } = meta;
            return (
                <div className={`${className} form-quantity`}>
                    <label className='form-quantity__label'>{title} {touched && ((error && <span className="form-quantity__label__error">{error}</span>) || (warning && <span className="form-quantity__label__warn">{warning}</span>))}</label>
                    <input className={`form-quantity__input ${touched && ((error && 'error') || (warning && 'warn'))}`} type="number" min={min ? min : 0} max={max ? max : 99} placeholder={placeholder} {...input} onKeyUp={event => onKeyUp ? onKeyUp(event) : f => f} />
                </div>
            )
        }
        return (
            <div className={`${className} form-quantity`}>
                <label className='form-quantity__label'>{title}</label>
                <input className='form-quantity__input' type="number" min={min ? min : 0} max={max ? max : 99} placeholder={placeholder} {...input} onKeyUp={event => onKeyUp ? onKeyUp(event) : f => f} />
            </div>
        )
    }
}

export class FormDecimal extends Component {
    unformatMoney(number) {
        if (typeof number == 'number')
        number = number.toString();

        while (number.indexOf(",") != -1) {
            number = number.replace(',', '');
        }
        number = number.replace('.', '');
        return number;
    }

    formatNumber(number){
        if (typeof number == 'number')
        number = number.toString();

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

    render() {
        const { className, title, placeholder, input, icon, meta } = this.props;
        if(meta) {
            const { touched, error, warning } = meta;
            return (
                <div className={`${className} form-decimal`}>
                    <label className='form-decimal__label'>{title} {touched && ((error && <span className="form-decimal__label__error">{error}</span>) || (warning && <span className="form-decimal__label__warn">{warning}</span>))}</label>
                    <div className={`form-decimal__input-container ${icon ? "icon" : ''}`}>
                        {
                            icon ?
                            <Icon className='form-decimal__input-container__icon' icon="dollar-sign" /> :
                            ""
                        }
                        <CurrencyInput className={`form-decimal__input-container__input ${touched && ((error && 'error') || (warning && 'warn'))}`} {...input} />
                    </div>
                </div>
            )
        }
        return (
            <div className={`${className} form-decimal`}>
                <label className='form-decimal__label'>{title}</label>
                <div className={`form-decimal__input-container ${icon ? "icon" : ''}`}>
                    {
                        icon ?
                        <Icon className='form-decimal__input-container__icon' icon="dollar-sign" /> :
                        ""
                    }
                    <CurrencyInput className='form-decimal__input-container__input' {...input} />
                </div>
            </div>
        )
    }
}

export class FormSelect extends Component {
    openSelect = () => {
        // console.log("Goes here!");
    }

    onChange(value) {
        const { input, onChangeEvent } = this.props;
        if(input)
            input.onChange(value);
        if(onChangeEvent)
            onChangeEvent(value.target.value);
    }

    render() {
        const { className, title, options, placeholder, input, meta } = this.props;
        if (meta) {
            const { touched, error, warning } = meta;
            return (
                <div className={`${className} form-select`}>
                    <label className='form-select__label'>{title} {touched && ((error && <span className="form-input__label__error">{error}</span>) || (warning && <span className="form-input__label__warn">{warning}</span>))}</label>
                    <div className='form-select__input-container'>
                        <select className={`form-select__input-container__input ${touched && ((error && 'error') || (warning && 'warn'))}`} {...input} onChange={value => this.onChange(value)}>
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
        return (
            <div className={`${className} form-select`}>
                <label className='form-select__label'>{title}</label>
                <div className='form-select__input-container'>
                    <select className='form-select__input-container__input' {...input} onChange={value => this.onChange(value)}>
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
        const { className, icon, type, onClick, onKeyUp, input } = this.props;
        return (
            <div className={`${className} form-small-button`}>
                <button type={type} {...input} onClick={onClick} onKeyUp={onKeyUp}><Icon className='form-small-button__icon' icon={icon}/></button>
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

    capitalizeString(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    toggleSelectSugestion(indexToChange) {
        const { selectedIndex } = this.state;
        const element = document.querySelectorAll('.form-list__input-container-list__input-container-suggestion__suggestions__suggestion')[indexToChange];
        if(selectedIndex !== -1) {
            const elementToRemoveClass = document.querySelectorAll('.form-list__input-container-list__input-container-suggestion__suggestions__suggestion')[selectedIndex];
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
                    return <div key={index} className='form-list__input-container-list__input-container-suggestion__suggestions__suggestion' onClick={() => this.selectSuggestion(item)} onMouseEnter={() => this.toggleSelectSugestion(index)}>{item}</div>
                }
                else {
                    return <div key={index} className='form-list__input-container-list__input-container-suggestion__suggestions__suggestion' onClick={() => this.selectSuggestion(item)} onMouseEnter={() => this.toggleSelectSugestion(index)}>{item[keyName]}</div>
                }
            })
        )
    }

    selectSuggestion(suggestion) {
        const { options } = this.props;
        const keyName = options.suggestion.keyName ? options.suggestion.keyName : null;
        this.setState({selectedSuggestion: suggestion});

        document.querySelector('.form-list__input-container-list__input-container-suggestion__input').value = keyName ? suggestion[keyName] : suggestion;
        document.querySelector('.form-list__input-container-list__input-container-suggestion__suggestions').classList.remove('active');
    }

    addSelectedValueToList(fields) {
        const { options } = this.props;

        const { objectName, objectValueInput } = options;
        var objectToAdd = {};
        
        objectName.map((name, index) => {
            if(objectValueInput[index] === null) {
                objectToAdd[name] = this.state.selectedSuggestion ? this.state.selectedSuggestion : '';
            }
            else if(objectValueInput[index][0] == '.' || objectValueInput[index][0] == '#') {
                objectToAdd[name] = document.querySelector(`${objectValueInput[index]} input`).value;
                document.querySelector(`${objectValueInput[index]} input`).value = '';
            }
            else {
                objectToAdd[name] = this.state.selectedSuggestion[name];
            }
        })

        fields.push(objectToAdd);
        document.querySelector('.form-list__input-container-list__input-container-suggestion__input').value = '';
    }

    handleKeyPress(event, fields) {
        const inputValue = event.target.value;
        const { suggestion, options } = this.props;

        options.suggestion.event.onKeyUp(event);

        if(inputValue.length >= 2 && event.key === 'Enter') {
            if (event.target.value !== '') {
                const suggestionElement = document.querySelector('.form-list__input-container-list__input-container-suggestion__suggestions');
                const suggestionItemElement = document.querySelectorAll('.form-list__input-container-list__input-container-suggestion__suggestions__suggestion.selected');
                if(suggestionElement.classList.contains('active') && suggestionItemElement.length > 0){
                    suggestionItemElement[0].click();
                }
                else if(!suggestionElement.classList.contains('active')) {
                    // Add To List
                    const { objectName, objectValueInput } = options;
                    var objectToAdd = {};
    
                    objectName.map((name, index) => {
                        if(objectValueInput[index] === null) {
                            objectToAdd[name] = this.state.selectedSuggestion ? this.state.selectedSuggestion : event.target.value;
                        }
                        else if(objectValueInput[index][0] == '.' || objectValueInput[index][0] == '#') {
                            objectToAdd[name] = document.querySelector(`${objectValueInput[index]} input`).value
                            document.querySelector(`${objectValueInput[index]} input`).value = ''
                        }
                        else {
                            objectToAdd[name] = this.state.selectedSuggestion[name];
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
            document.querySelector('.form-list__input-container-list__input-container-suggestion__suggestions').classList.add('active');
        }
        else {
            document.querySelector('.form-list__input-container-list__input-container-suggestion__suggestions').classList.remove('active');
        }
    }

    removeElementFromList(fields, index) {
        fields.remove(index);
    }

    render() {
        const { className, placeholder, title, fields, input, options, componentList, suggestion } = this.props;
        const { objectName, objectValueInput } = options;
        return (
            <div className={`${className} form-list ${options.type === 'modal' ? 'form-list-modal' : ''}`}>
                <div className='form-list__input-container-list'>
                    {
                        suggestion ?
                        <div className='form-list__input-container-list__input-container-suggestion'>
                            <label className='form-list__input-container-list__input-container-suggestion__label'>{title}</label>
                            <input autoComplete='off' className='form-list__input-container-list__input-container-suggestion__input' type='text' placeholder={placeholder} onKeyUp={(event) => this.handleKeyPress(event, fields)} {...input}/>
                            <div className='form-list__input-container-list__input-container-suggestion__suggestions'>
                                {this.generateSuggestion(this.state.suggestionList)}
                            </div>
                        </div>
                        :
                        ''
                    }
                    <div className={`form-list__input-container-list__input-container ${suggestion ? '' : 'full'}`}>
                        {
                            componentList ?
                            componentList.map((component, index) => {
                                return (
                                    <div key={index} className='form-list__input-container-list__input-container__item'>
                                        {component}
                                    </div>
                                );
                            })
                            :
                            ''
                        }
                    </div>
                    <div className='form-list__input-container-list__input-button'>
                        <FormSmallButton onKeyUp={(event) => { event.key == "Enter" ? this.addSelectedValueToList(fields) : '' }} onClick={() => this.addSelectedValueToList(fields)} className='form-list__input-container-list__input-button__button' type='button' icon='plus'/>
                    </div>
                </div>
                <div className='form-list__item-list'>
                    {/* Header */}
                    <div className={`form-list__item-list__header-container ${suggestion ? '' : 'full'}`}>
                        <div className='form-list__item-list__header-container__item'></div>
                        {
                            objectName.map((name, index) => {
                                return <div key={index} className='form-list__item-list__header-container__item'>{this.capitalizeString(name)}</div>
                            })
                        }
                    </div>
                    {/* Body */}
                    {   
                        fields.length !== 0 ?
                        fields.getAll().map((item, index) => {
                            return (
                                <div key={index} className={`form-list__item-list__item-container ${suggestion ? '' : 'full'}`}>
                                    <div className='form-list__item-list__item-container__item icon-container'><Icon className='form-list__item-list__item-container__item__icon' icon='times' onClick={() => this.removeElementFromList(fields, index)} /></div>
                                    {   
                                        objectName ?
                                        objectName.map((name, index) => {
                                            const options = this.props;
                                            const keyName = options.suggestion && options.suggestion.keyName ? options.suggestion.keyName : 'name';
                                            
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
                        <div className='form-list__item-list__item-container'>
                            <div className='form-list__item-list__item-container__item full'>Empty</div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export class FormImage extends Component {
    
    dropzoneConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: 'no-url'
            // postUrl: "https://httpbin.org/post"
        }
    }
    
    djsConfig() {
        const { maxFiles } = this.props;
        return {
            addRemoveLinks: true,
            autoProcessQueue: false,
            maxFiles,
            previewTemplate: ReactDOMServer.renderToStaticMarkup(
                <div className="dropzone-thumbnail dz-preview dz-file-preview">
                    <div className="dropzone-thumbnail__image-container dz-image"> 
                        <img className="dropzone-thumbnail__details__image" data-dz-thumbnail="true" />
                    </div>
                    <div className="dropzone-thumbnail__details dz-details">
                        <div className="dropzone-thumbnail__details__size dz-size"><span data-dz-size="true"></span></div>
                        <div className="dropzone-thumbnail__details__filename dz-filename"><span data-dz-name="true"></span></div>
                        <div className="dropzone-thumbnail__details__remove dz-remove" data-dz-remove="true"><Icon className="dropzone-thumbnail__details__remove__icon" icon="minus"></Icon></div>
                    </div>
                    <div className="dropzone-thumbnail__progress dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
                    <div className="dropzone-thumbnail__success dz-success-mark"><span>✔</span></div>
                    <div className="dropzone-thumbnail__error dz-error-mark"><span>✘</span></div>
                    <div className="dropzone-thumbnail__error-message dz-error-message"><span data-dz-errormessage="true"></span></div>
                </div>
              )
        }
    }
    
    onMaxFilesExceeded(file) {
        this.removeFile(file);
    }
    
    render() {
        const { className, onAddImage, onRemoveImage, title, input } = this.props;
        const eventHandlers = {
            addedfile: onAddImage,
            removedfile: onRemoveImage,
            maxfilesexceeded: this.onMaxFilesExceeded,

        }
        return (
            <div className={`${className} form-image`}>
                <label className='form-image__label'>{title}</label>
                <DropzoneComponent className='form-image__form' config={this.dropzoneConfig()} djsConfig={this.djsConfig()} eventHandlers={eventHandlers} />
            </div>
        )
    }
}