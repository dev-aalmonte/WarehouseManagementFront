import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { reduxForm, Field } from 'redux-form';
import { FormInput, FormButton, FormSelect } from '../formFields';
import { API_URL } from '../../config';

import { Heading, SmallHeading } from '../common/headings';

class StockEditForm extends Component {
    render() {
        const { className, handleSubmit, status } = this.props;
        return (
            <form onSubmit={handleSubmit} className={`${className} stock-edit-form`}>
                <Field className='stock-edit-form__stock' type='text' name='stock' title='Stock' placeholder='Stock' component={FormInput} />
                <Field className='stock-edit-form__status' name='statusID' title='Status' placeholder='Select a Status' component={FormSelect} options={status} />
                <Field className='stock-edit-form__submit' type='submit' name='submit' title='Add To Stock' component={FormButton}/>
            </form>
        )
    }
}

class StockEdit extends Component {
    resetTable() {
        const { warehouseID } = this.props.selected_stock;
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getStockPerWarehouse(warehouseID, `${API_URL}/stock?page=${current_page}`)
        else
            this.props.getStockPerWarehouse(warehouseID);
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    onSubmit = (fields) => {
        // console.log("Fields to Edit: ", fields);
        this.props.editStock(fields, () => {
            document.querySelectorAll('.modal').forEach((element) => {
                element.classList.remove('active');
                this.resetTable();
                this.resetActive();
            })
        });
    }

    render() {
        const statusSelect = this.props.status.map(status => {
            return {
                key: status.id,
                value: status.name
            }
        })

        return (
            <div className='stock-edit'>
                <div className='stock-edit__background'></div>
                <div className='stock-edit__content'>
                    <div className='stock-edit__content__header'>
                        <Heading className='stock-edit__title'>Edit Stock</Heading>
                        <SmallHeading size="small" className="stock-edit__subheading">{this.props.selected_stock.product ? this.props.selected_stock.product.name : ""}</SmallHeading>
                    </div>
                    <StockEditForm onSubmit={(e) => this.onSubmit(e)} onKeyPress={this.onKeyPress} className='stock-add__content__form' status={statusSelect}/>
                </div>
            </div>
        )
    }
}

StockEditForm = reduxForm({
    form: 'stock-edit',
    enableReinitialize: true
})(StockEditForm);

StockEditForm = connect(state => {
    const { selected_stock } = state.warehouse;
    const initialValues = {
        id: selected_stock.id,
        statusID: selected_stock.statusID,
        stock: selected_stock.stock
    };
    return { initialValues };
}, actions)(StockEditForm)

function mapStateToProps(state) {
    const { selected_stock, pagination } = state.warehouse;
    const { status } = state.status
    return { selected_stock, status, pagination };
}

export default connect(mapStateToProps, actions)(StockEdit);