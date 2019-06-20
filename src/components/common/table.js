import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { FormSmallButton } from '../formFields';

class Table extends Component {

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

    paginationOnClick(url) {
        if (url != null){
            console.log("Going to: ", url);
            this.props.getProducts(url);
        }
    }

    render() {
        const { className, heading, body, columnName, template, pagination } = this.props;
        return (
            <div className={`${className} table`}>
                <div className='table__heading'>
                    {
                        heading.map((title, index) => {
                            return <div key={index} className='table__heading__item'>{title}</div>
                        })
                    }
                </div>
                <div className='table__body'>
                    {
                        body.map((item, index) => {
                            return (
                                <div key={index} className='table__body__row'>
                                    {
                                        columnName.map((column, index) => {
                                            var templateItem = '';
                                            if(typeof template[index] === 'undefined' || template[index] === null || template[index] === ''){
                                                templateItem = item[column];
                                            }
                                            else {
                                                templateItem = this.renderTemplate(template, item, column, index);
                                            }
                                            return <div key={index} className='table__body__row__item'>{templateItem}</div>  
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className='table__footer'>
                    <div className='table__footer__paginationInfo'>
                        Page: {pagination.current_page} of {pagination.last_page}
                    </div>
                    <div className='table__footer__paginationButtons'>
                        <FormSmallButton onClick={() => this.paginationOnClick(pagination.prev_page_url)} className={`table__footer__paginationButtons__button ${pagination.prev_page_url == null ? 'hidden' : '' }`} type='button' icon='angle-left'/>
                        <FormSmallButton onClick={() => this.paginationOnClick(pagination.next_page_url)} className={`table__footer__paginationButtons__button ${pagination.next_page_url == null ? 'hidden' : '' }`} type='button' icon='angle-right'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, actions)(Table);