import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';

import { Heading } from '../common/headings';
import { FormInput, FormButton, FormSelect } from '../formFields';

class WarehouseAddForm extends Component {
    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getWarehouses(`http://127.0.0.1:8000/api/warehouses?page=${current_page}`)
        else
            this.props.getWarehouses();
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    render() {
        const { className, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit} className={`${className} warehouse-add-form`}>
                <Field className='warehouse-add-form__name' type='text' name='name' title='Name' placeholder='Name' component={FormInput} />
                <Field className='warehouse-add-form__street-address' type='text' name='street_address' title='Street Address' placeholder='Street Address' component={FormInput} />
                <Field className='warehouse-add-form__extra-address' type='text' name='extra_address' title='Secondary' placeholder='Extra address information' component={FormInput} />
                <Field className='warehouse-add-form__city' name='city' title='City' placeholder='City' component={FormInput} />
                <Field className='warehouse-add-form__state' type='text' name='state' title='State' placeholder='State' component={FormInput} />
                <Field className='warehouse-add-form__country' name='country' title='Country' placeholder='Country' component={FormInput} />
                <Field className='warehouse-add-form__zipcode' type='text' name='zipcode' title='Zip Code' placeholder='Zip Code' component={FormInput}/>
                <Field className='warehouse-add-form__submit' type='submit' name='submit' title='Add Product' onClick={() => console.log('submiting Product')} component={FormButton}/>
            </form>
        )
    }
}

class WarehouseAdd extends Component {
    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getWarehouses(`http://127.0.0.1:8000/api/warehouses?page=${current_page}`)
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
            <div className={`warehouse-add`}>
                <div className='warehouse-add__background'></div>
                <div className='warehouse-add__content'>
                    <Heading className='warehouse-add__title'>Add Warehouse</Heading>
                    <WarehouseAddForm onSubmit={(e) => this.onSubmit(e)} className='warehouse-add__content__form'/>
                </div>
            </div>
        )
    }
}

WarehouseAddForm = reduxForm({
    form: 'warehouse-add',
    enableReinitialize: true
})(WarehouseAddForm);

WarehouseAddForm = connect(state => {
    const { selected_warehouse } = state.warehouse;
    const initialValues = selected_warehouse.name ? {
        id: selected_warehouse.id,
        name: selected_warehouse.name,
        street_address: selected_warehouse.address.street_address,
        extra_address: selected_warehouse.address.extra_address,
        city: selected_warehouse.address.city,
        state: selected_warehouse.address.state,
        country: selected_warehouse.address.country,
        zipcode: selected_warehouse.address.zipcode,
    } :
    {};
    return { initialValues };
})(WarehouseAddForm);

function mapStateToProps(state) {
    const { selected_warehouse, pagination } = state.warehouse;
    return { selected_warehouse, pagination };
}

export default connect(mapStateToProps, actions)(WarehouseAdd);