import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { API_URL } from '../../config';

import { Heading } from '../common/headings';
import { FormInput, FormButton, FormList } from '../formFields';


class StockAddForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            stockToAdd: []
        }
    }

    render() {
        const { className, handleSubmit } = this.props;
        const suggestionList = ['Hello', 'There', 'I love', 'The hentai', 'The Traps', 'The futas', 'Everything'];
        const listOption = {
            type: "modal",
            objectName: ['product', 'stock'],
            objectValueInput: [null, '.stock-add-form__stock']
        }
        return (
            <form onSubmit={handleSubmit} className={`${className} stock-add-form`}>
                <Field className='stock-add-form__warehouse' type='text' name='warehouseID' title='Warehouse' placeholder='Search for Warehouse' component={FormInput} />
                <Field className='stock-add-form__stock' type='text' name='stock' title='Stock' placeholder='Stock' component={FormInput} />
                <FieldArray className='stock-add-form__products' suggestion={suggestionList} name='products' title='Products' placeholder='Look for a product by the ID, SKU, or Name' component={FormList} options={listOption}/>
                <Field className='stock-add-form__submit' type='submit' name='submit' title='Add To Stock' component={FormButton}/>
            </form>
        )
    }
}

class StockAdd extends Component {
    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getWarehouses(`${API_URL}/warehouses?page=${current_page}`)
        else
            this.props.getWarehouses();
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    onSubmit = (fields) => {
        this.props.addWarehouse(fields, () => {
            document.querySelectorAll('.modal').forEach((element) => {
                element.classList.remove('active');
                this.resetTable();
                this.resetActive();
            })
        });
    }

    render() {
        return(
            <div className='stock-add'>
                <div className='stock-add__background'></div>
                <div className='stock-add__content'>
                    <Heading className='stock-add__title'>Add to Stock</Heading>
                    <StockAddForm onSubmit={(e) => this.onSubmit(e)} className='stock-add__content__form'/>
                </div>
            </div>
        )
    }
}

StockAddForm = reduxForm({
    form: 'stock-add',
    enableReinitialize: true
})(StockAddForm);

StockAddForm = connect(state => {
    const { selected_stock } = state.warehouse;
    const initialValues = selected_stock.id ? {
        id: selected_stock.id,
        productID: selected_stock.productID,
        warehouseID: selected_stock.warehouseID,
        stock: selected_stock.stock
    } :
    {};
    return { initialValues };
})(StockAddForm)

function mapStateToProps(state) {
    const { selected_warehouse, selected_stock, pagination } = state.warehouse;
    return { selected_warehouse, selected_stock, pagination };
}

export default connect(mapStateToProps, actions)(StockAdd);