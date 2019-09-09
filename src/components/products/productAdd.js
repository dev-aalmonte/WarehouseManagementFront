import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { API_URL } from '../../config';

import { Heading } from '../common/headings';
import { FormInput, FormButton, FormSelect, FormDecimal } from '../formFields';
import { required } from '../formFieldsValidation';
import { notify } from '../common/general';

class ProductAddForm extends Component {
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
                <Field className='product-add-form__name' type='text' name='name' title='Name' placeholder='Name' component={FormInput}  validate={[required]} />
                <Field className='product-add-form__price' type='text' name='price' title='Price' placeholder='Price' component={FormDecimal} icon='dollar-sign' validate={[required]} />
                <Field className='product-add-form__description' type='text' name='description' title='Description' placeholder='Description' component={FormInput} validate={[required]} />
                <Field className='product-add-form__metric-weight' name='metric_weight' title='Metric Weight' placeholder='Select a metric weight' options={weightOption} component={FormSelect} />
                <Field className='product-add-form__weight' type='text' name='weight' title='Weight' placeholder='Weight' component={FormDecimal} />
                <Field className='product-add-form__metric-longitude' name='metric_longitude' title='Metric Longitude' placeholder='Select a metric longitude' options={longitudeOption} component={FormSelect} />
                <Field className='product-add-form__width' type='text' name='width' title='Width' placeholder='Width' component={FormDecimal}/>
                <Field className='product-add-form__height' type='text' name='height' title='Height' placeholder='Height' component={FormDecimal} />
                <Field className='product-add-form__length' type='text' name='length' title='Length' placeholder='Length' component={FormDecimal} />
                <Field className='product-add-form__submit' type='submit' name='submit' title='Add Product' onClick={() => console.log('submiting Product')} component={FormButton}/>
            </form>
        )
    }
}

class ProductAdd extends Component {
    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getProducts(`${API_URL}/products?page=${current_page}`)
        else
            this.props.getProducts();
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    unformatNumber(number) {
        if (typeof number == 'number')
            number = number.toString();

        while (number.indexOf(",") != -1) {
            number = number.replace(',', '');
        }
        return number;
    }

    onSubmit = (fields) => {
        fields.price = this.unformatNumber(fields.price);
        fields.weight = this.unformatNumber(fields.weight);
        fields.width = this.unformatNumber(fields.width);
        fields.height = this.unformatNumber(fields.height);
        fields.length = this.unformatNumber(fields.length);
        
        this.props.addProduct(fields, () => {
            document.querySelectorAll('.modal').forEach((element) => {
                notify('success', 'The product has been added successfully');
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
    const { selected_product, pagination } = state.product;
    return { initialValues: selected_product, pagination };
})(ProductAddForm);

function mapStateToProps(state) {
    const { selected_product, pagination } = state.product;
    return { selected_product, pagination };
}

export default connect(mapStateToProps, actions)(ProductAdd);