import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { API_URL } from '../../config';

import { Heading } from '../common/headings';
import { FormInput, FormButton, FormList, FormSelect, FormQuantity } from '../formFields';
import { notify } from '../common/general';

class LocationAddForm extends Component {
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
        const listOption = {
            type: "modal",
            objectName: ['Section', 'Aisle', 'Column', 'Row'],
            objectValueInput: ['.location-add-form__section', '.location-add-form__aisle', '.location-add-form__column', '.location-add-form__row']
        }
        return (
            <form onSubmit={handleSubmit} onKeyPress={onKeyPress} className={`${className} location-add-form`}>
                <Field className='location-add-form__warehouse' name='warehouseID' title='Warehouse' placeholder='Select a Warehouse' component={FormSelect} options={warehouse} />
                <FieldArray className='location-add-form__products' name='products' title='Products' placeholder='Look for a product by the ID, SKU, or Name' component={FormList} options={listOption} onKeyUp={this.listOnKeyUp} componentList={[
                    <Field className='location-add-form__section' name='section' title='Section' placeholder='Section' component={FormInput} />,
                    <Field className='location-add-form__aisle' min="0" max="99" name='aisle' title='Aisle' placeholder='Aisle' component={FormQuantity} />,
                    <Field className='location-add-form__column' min="0" max="99" name='column' title='Column' placeholder='Column' component={FormQuantity} />,
                    <Field className='location-add-form__row' min="0" max="99" name='row' title='Row' placeholder='Row' component={FormQuantity} />,
                ]}/>
                <Field className='location-add-form__submit' type='submit' name='submit' title='Add To location' component={FormButton}/>
            </form>
        )
    }
}

class LocationAdd extends Component {
    resetTable() {
        const { id } = this.props.selected_warehouse;
        const { current_page } = this.props.pagination;
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
        console.log("Fields", fields);
        // fields.products.map(item => {
        //     const fieldToSubmit = {
        //         warehouseID: fields.warehouseID,
        //         productID: item.product.id,
        //         statusID: 2,
        //         stock: item.stock
        //     }

        //     this.props.addStock(fieldToSubmit, (res) => {
        //         document.querySelectorAll('.modal').forEach((element) => {
        //             element.classList.remove('active');
        //             this.resetTable();
        //             this.resetActive();
        //         })
        //     });
        // });
        notify('success', 'The products has been added in the warehouse successfully');
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter')
            event.preventDefault();
    }

    render() {
        return (
            <div className='location-add'>
                <div className='location-add__background'></div>
                <div className='location-add__content'>
                    <Heading className='location-add__title'>Create Location</Heading>
                    <LocationAddForm onSubmit={(e) => this.onSubmit(e)} onKeyPress={this.onKeyPress} className='stock-add__content__form' />
                </div> 
            </div>
        )
    }
}

LocationAddForm = reduxForm({
    form: 'location-add',
    enableReinitialize: true
})(LocationAddForm);

LocationAddForm = connect(state => {
    const { selected_location, selected_warehouse } = state.warehouse;
    const initialValues = selected_location.id ? {
        id: selected_location.id,
        warehouseID: selected_location.warehouseID
    } :
    {
        warehouseID: selected_warehouse.id
    };
    return { initialValues };
}, actions)(LocationAddForm)

function mapStateToProps(state) {
    const { selected_warehouse, selected_stock, pagination, warehouses } = state.warehouse;
    return { selected_warehouse, selected_stock, pagination, warehouses };
}

export default connect(mapStateToProps, actions)(LocationAdd);