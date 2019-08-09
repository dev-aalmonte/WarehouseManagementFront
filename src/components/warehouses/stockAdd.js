import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { API_URL } from '../../config';

import { Heading } from '../common/headings';
import { FormInput, FormButton, FormList, FormSelect, FormQuantity } from '../formFields';

class StockAddForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            stockToAdd: []
        }
    }

    componentWillMount() {
        this.props.getProducts();
    }

    listOnKeyUp = (event) => {
        const search = event.target.value;
        this.props.getProducts(null, search);
    }

    render() {
        const { className, handleSubmit, warehouse, onKeyPress } = this.props;
        const suggestionList = this.props.products;
        const listOption = {
            type: "modal",
            objectName: ['product', 'stock'],
            objectValueInput: [null, '.stock-add-form__stock'],
            suggestion: {
                keyName: 'name',
                event: {
                    onKeyUp: this.listOnKeyUp
                }
            }
        }
        return (
            <form onSubmit={handleSubmit} onKeyPress={onKeyPress} className={`${className} stock-add-form`}>
                <Field className='stock-add-form__warehouse' name='warehouseID' title='Warehouse' placeholder='Select a Warehouse' component={FormSelect} options={warehouse} />
                <Field className='stock-add-form__stock' min="0" max="99" name='stock' title='Stock' placeholder='Stock' component={FormQuantity} />
                <FieldArray className='stock-add-form__products' suggestion={suggestionList} name='products' title='Products' placeholder='Look for a product by the ID, SKU, or Name' component={FormList} options={listOption} onKeyUp={this.listOnKeyUp}/>
                <Field className='stock-add-form__submit' type='submit' name='submit' title='Add To Stock' component={FormButton}/>
            </form>
        )
    }
}

class StockAdd extends Component {
    resetTable() {
        const { id } = this.props.selected_warehouse;
        const { current_page } = this.props.pagination;
        console.log("Warehouse ID:", id);
        if(current_page != null)
            this.props.getStockPerWarehouse(id, `${API_URL}/stock?page=${current_page}`)
        else
            this.props.getStockPerWarehouse(id);
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    onSubmit = (fields) => {
        fields.products.map(item => {
            const fieldToSubmit = {
                warehouseID: fields.warehouseID,
                productID: item.product.id,
                statusID: 2,
                stock: item.stock
            }

            this.props.addStock(fieldToSubmit, (res) => {
                document.querySelectorAll('.modal').forEach((element) => {
                    element.classList.remove('active');
                    this.resetTable();
                    this.resetActive();
                })
            });
        });
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter')
            event.preventDefault();
    }

    render() {
        const warehousesSelect = this.props.warehouses.map(warehouse => {
            return {
                key: warehouse.id,
                value: warehouse.name
            }
        });
        return (
            <div className='stock-add'>
                <div className='stock-add__background'></div>
                <div className='stock-add__content'>
                    <Heading className='stock-add__title'>Add to Stock</Heading>
                    <StockAddForm onSubmit={(e) => this.onSubmit(e)} onKeyPress={this.onKeyPress} className='stock-add__content__form' warehouse={warehousesSelect}/>
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
    const { selected_stock, selected_warehouse } = state.warehouse;
    const { products } = state.product;
    const initialValues = selected_stock.id ? {
        id: selected_stock.id,
        productID: selected_stock.productID,
        warehouseID: selected_stock.warehouseID,
        stock: selected_stock.stock
    } :
    {
        warehouseID: selected_warehouse.id,
        products: [],
        stock: ""
    };
    return { initialValues, products };
}, actions)(StockAddForm)

function mapStateToProps(state) {
    const { selected_warehouse, selected_stock, pagination, warehouses } = state.warehouse;
    return { selected_warehouse, selected_stock, pagination, warehouses };
}

export default connect(mapStateToProps, actions)(StockAdd);