import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';

import { Heading } from '../common/headings';
import { FormInput, FormButton, FormSelect } from '../formFields';

class ProductAddForm extends Component {
    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getProducts(`http://127.0.0.1:8000/api/products?page=${current_page}`)
        else
            this.props.getProducts();
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    render() {
        const { className, handleSubmit } = this.props;
        const weightOption = [
            {
                key: 'lb',
                value: 'Pounds (LB)'
            },
            {
                key: 'kg',
                value: 'Kilograms (KG)'
            }
        ]
        const longitudeOption = [
            {
                key: 'ft',
                value: 'Feets (FT)'
            },
            {
                key: 'm',
                value: 'Meters (M)'
            }
        ]
        return (
            <form onSubmit={handleSubmit} className={`${className} product-add-form`}>
                <Field className='product-add-form__name' type='text' name='name' title='Name' placeholder='Name' component={FormInput} />
                <Field className='product-add-form__price' type='text' name='price' title='Price' placeholder='Price' component={FormInput} />
                <Field className='product-add-form__description' type='text' name='description' title='Description' placeholder='Description' component={FormInput} />
                <Field className='product-add-form__metric-weight' name='metric_weight' title='Metric Weight' placeholder='Select a metric weight' options={weightOption} component={FormSelect} />
                <Field className='product-add-form__weight' type='text' name='weight' title='Weight' placeholder='Weight' component={FormInput} />
                <Field className='product-add-form__metric-longitude' name='metric_longitude' title='Metric Longitude' placeholder='Select a metric longitude' options={longitudeOption} component={FormSelect} />
                <Field className='product-add-form__width' type='text' name='width' title='Width' placeholder='Width' component={FormInput}/>
                <Field className='product-add-form__height' type='text' name='height' title='Height' placeholder='Height' component={FormInput} />
                <Field className='product-add-form__length' type='text' name='length' title='Length' placeholder='Length' component={FormInput} />
                {/* <Field className='product-add-form__status' name='status' title='Status' placeholder='Select a status' options={statusOptions} component={FormSelect} />
                <Field className='product-add-form__warehouse' name='warehouse' title='Warehouse' placeholder='Select a warehouse'  options={statusOptions} component={FormSelect} /> */}
                <Field className='product-add-form__submit' type='submit' name='submit' title='Add Product' onClick={() => console.log('submiting Product')} component={FormButton}/>
            </form>
        )
    }
}

class ProductAdd extends Component {
    onSubmit = (fields) => {
        this.props.addProduct(fields, () => {
            document.querySelectorAll('.modal').forEach((element) => {
                element.classList.remove('active');
                this.resetTable();
                this.resetActive();
            })
        });
    }

    render() {
        return (
            <div className={`product-add`}>
                <div className='product-add__background'></div>
                <div className='product-add__content'>
                    <Heading className='product-add__title'>Add Product</Heading>
                    <ProductAddForm onSubmit={(e) => this.onSubmit(e)} className='product-add__content__form' />
                </div>
            </div>
        )
    }
}


ProductAddForm = reduxForm({
    form: 'product-add',
    enableReinitialize: true
})(ProductAddForm);

ProductAddForm = connect((state) => {
    const { selected_product } = state.product;
    return { initialValues: selected_product };
})(ProductAddForm);

function mapStateToProps(state) {
    const { selected_product } = state.product;
    return { selected_product };
}

export default connect(mapStateToProps, actions)(ProductAdd);