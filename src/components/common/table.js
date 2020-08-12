import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { FormSmallButton } from '../formFields';

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastSelectedIndex: null,
            activeKey: ''
        }
    }

    renderTemplate(template, item, column, index) {
        var templateItem = "";
        if(Array.isArray(column)){
            const templateIndex = index;
            column.map((name, index) => {
                if(index == 0) {
                    templateItem = template[templateIndex].replace('[data]', item[name]);
                }
                else {
                    templateItem = templateItem.replace('[data]', item[name]);
                }
            })
        }
        else {
            templateItem = template[index].replace('[data]', item[column]);
        }

        return templateItem;
    }

    onKeyDown(event) {
        if(this.state.activeKey !== 'Shift' && event.key == 'Shift'){
            this.setState({activeKey: event.key});
        }
    }

    onKeyUp(event) {
        if(this.state.activeKey === 'Shift' && event.key === 'Shift'){
            this.setState({activeKey: ''});
        }
    }

    rowOnClick = (event, index) => {
        const parent = event.target.parentElement;
        const parentIsActive = parent.classList.contains('active');

        const allElements = parent.parentElement.childNodes;
        
        if(parent.parentElement.classList.contains("table"))
            return;

        if(this.state.activeKey == 'Shift') {
            if(this.state.lastSelectedIndex == null)
                parent.classList.add('active');
            else if(this.state.lastSelectedIndex > index){
                const firstIndex = index;
                const lastIndex = this.state.lastSelectedIndex;

                allElements.forEach((element, index) => {
                    if(index >= firstIndex && index <= lastIndex)
                        element.classList.add('active');
                })
            }
            else if(this.state.lastSelectedIndex < index){
                const firstIndex = this.state.lastSelectedIndex;
                const lastIndex = index;

                allElements.forEach((element, index) => {
                    if(index >= firstIndex && index <= lastIndex)
                        element.classList.add('active');
                })
            }
        }
        else {
            allElements.forEach(element => {
                element.classList.remove('active');
            });

            if(!parentIsActive)
                parent.classList.add('active');
        }
        this.setState({lastSelectedIndex: index});
    }

    render() {
        const { className, heading, body, columnName, template, pagination, events } = this.props;
        return (
            <div className={`${className} table`} onKeyDownCapture={event => this.onKeyDown(event)}  onKeyUpCapture={event => this.onKeyUp(event)} tabIndex="0">
                <div className='table__heading'>
                    {
                        heading ?
                        heading.map((title, index) => {
                            return <div key={index} className='table__heading__item'>{title}</div>
                        })
                        : 
                        <div className='table__heading__item'>No data to show</div>
                    }
                </div>
                <div className='table__body'>
                    {
                        body ?
                        body.map((item, index) => {
                            return (
                                <div key={index} id={index} className='table__body__row' onClick={(event) => this.rowOnClick(event, index)} onDoubleClick={(event) => events.onDoubleClick(event)}>
                                    {
                                        columnName.map((column, index) => {
                                            var templateItem = '';
                                            if(typeof column === "string"){
                                                if (template) {
                                                    templateItem = this.renderTemplate(template, item, column, index);
                                                }
                                                else {
                                                    templateItem = item[column];
                                                }
                                            }
                                            else if(Array.isArray(column)){
                                                templateItem = this.renderTemplate(template, item, column, index);
                                            }
                                            else if(typeof column === "object"){
                                                if(Array.isArray(column.column)){
                                                    templateItem = this.renderTemplate(template, item[column.key], column.column, index);
                                                }
                                                else {
                                                    templateItem = item[column.key][column.column];
                                                }
                                            }
                                            
                                            return <div key={index} className='table__body__row__item'>{templateItem}</div>  
                                        })
                                    }
                                </div>
                            )
                        })
                        :
                        <div className='table__body__row'>
                            <div className='table__body__row__item'>No data to Show</div>
                        </div>
                    }
                </div>
                {
                    // TODO: Delete after implementation of pagination
                    pagination ?
                    (
                        <div className='table__footer'>
                            <div className='table__footer__paginationInfo'>
                                Page: {pagination.current_page} of {pagination.last_page}
                            </div>
                            <div className='table__footer__paginationButtons'>
                                <FormSmallButton onClick={() => this.paginationOnClick(pagination.prev_page_url)} className={`table__footer__paginationButtons__button prev ${pagination.prev_page_url == null ? 'hidden' : '' }`} type='button' icon='angle-left'/>
                                <FormSmallButton onClick={() => this.paginationOnClick(pagination.next_page_url)} className={`table__footer__paginationButtons__button next ${pagination.next_page_url == null ? 'hidden' : '' }`} type='button' icon='angle-right'/>
                            </div>
                        </div>
                    ) :
                    ''
                }
            </div>
        )
    }
}

export default connect(null, actions)(Table);