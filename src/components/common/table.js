import React, { Component } from 'react';

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

    render() {
        const { className, heading, body, columnName, template } = this.props;
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
            </div>
        )
    }
}

export default Table;