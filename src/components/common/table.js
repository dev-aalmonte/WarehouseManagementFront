import React, { Component } from 'react';

class Table extends Component {
    render() {
        const { className, heading, body } = this.props;
        return (
            <div className={`${className} table`}>
                <div className='table__heading'>
                    <div className='table__heading__item'>Item1</div>
                    <div className='table__heading__item'>Item2</div>
                    <div className='table__heading__item'>Item3</div>
                    <div className='table__heading__item'>Item4</div>
                </div>
                <div className='table__body'>
                    <div className='table__body__row'>
                        <div className='table__body__row__item'>Item1</div>
                        <div className='table__body__row__item'>Item2</div>
                        <div className='table__body__row__item'>Item3</div>
                        <div className='table__body__row__item'>Item4</div>
                    </div>
                    <div className='table__body__row'>
                        <div className='table__body__row__item'>Item1</div>
                        <div className='table__body__row__item'>Item2</div>
                        <div className='table__body__row__item'>Item3</div>
                        <div className='table__body__row__item'>Item4</div>
                    </div>
                    <div className='table__body__row'>
                        <div className='table__body__row__item'>Item1</div>
                        <div className='table__body__row__item'>Item2</div>
                        <div className='table__body__row__item'>Item3</div>
                        <div className='table__body__row__item'>Item4</div>
                    </div>
                    <div className='table__body__row'>
                        <div className='table__body__row__item'>Item1</div>
                        <div className='table__body__row__item'>Item2</div>
                        <div className='table__body__row__item'>Item3</div>
                        <div className='table__body__row__item'>Item4</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Table;