import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import { Heading } from '../common/headings';
import { FormInput, FormButton } from '../formFields';

class ProductAddForm extends Component {
    render() {
        const { className, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit} className={`${className} product-add-form`}>
                <Field className='product-add-form__name' type='text' name='name' title='Name' placeholder='Name' component={FormInput} />
                <Field className='product-add-form__price' type='text' name='price' title='Price' placeholder='Price' component={FormInput} />
                <Field className='product-add-form__description' type='text' name='description' title='Description' placeholder='Description' component={FormInput} />
                <Field className='product-add-form__metric-weight' type='text' name='metric_weight' title='Metric Weight' placeholder='Metric Weight' component={FormInput} />
                <Field className='product-add-form__weight' type='text' name='weight' title='Weight' placeholder='Weight' component={FormInput} />
                <Field className='product-add-form__metric-longitude' type='text' name='metric_longitude' title='Metric Longitude' placeholder='Metric Longitude' component={FormInput} />
                <Field className='product-add-form__width' type='text' name='width' title='Width' placeholder='Width' component={FormInput} />
                <Field className='product-add-form__height' type='text' name='height' title='Height' placeholder='Height' component={FormInput} />
                <Field className='product-add-form__length' type='text' name='length' title='Length' placeholder='Length' component={FormInput} />
                <Field className='product-add-form__status' type='text' name='status' title='Status' placeholder='Status' component={FormInput} />
                <Field className='product-add-form__warehouse' type='text' name='warehouse' title='Warehouse' placeholder='Warehouse' component={FormInput} />
                <Field className='product-add-form__submit' type='submit' name='submit' title='Add Product' onClick={() => console.log('submiting Product')} component={FormButton}/>
            </form>
        )
    }
}

class ProductAdd extends Component {
    onSubmit = (fields) => {
        console.log(fields);
    }

    render() {
        // const { className } = this.props;
        return (
            <div className={`product-add`}>
                <div className='product-add__background'></div>
                <div className='product-add__content'>
                    <Heading className='product-add__title'>Add Product</Heading>
                    <ProductAddForm onSubmit={this.onSubmit} className='product-add__content__form' />
                </div>
            </div>
        )
    }
}

ProductAddForm = reduxForm({
    form: 'product-add'
})(ProductAddForm);

export default ProductAdd;