import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';

import { Heading } from '../common/headings';
import { FormSelect, FormList, FormButton } from '../formFields';

class OrderNewForm extends Component {
    render() {
        const { className, handleSubmit, onKeyPress } = this.props;
        const statusOptions = [
            {
                key: 1,
                value: 'Item 1'
            },
            {
                key: 2,
                value: 'Item 2'
            }
        ]
        const suggestionList = ['Hello', 'There', 'I love', 'The hentai', 'The Traps', 'The futas', 'Everything'];
        return (
            <form onSubmit={handleSubmit} onKeyPress={onKeyPress} className={`${className} order-add-form`}>
                <Field className='order-add-form__client' name='clientID' title='Client' placeholder='Select a Client' options={statusOptions} component={FormSelect} />
                <FieldArray suggestion={suggestionList} name='products' title='Product List' placeholder='Look for a product by the ID, SKU, or Name' component={FormList}/>
                <Field className='order-add-form__submit' type='submit' title='Make order' onClick={() => console.log("Submiting order")} component={FormButton} />
            </form>
        )
    }
}

class OrderNew extends Component {
    onSubmit = (fields) => {
        console.log(fields);
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter')
            event.preventDefault();
    }

    render() {
        return (
            <div className='order-new'>
                <Heading className='order-new__heading'>New Order</Heading>
                <OrderNewForm onSubmit={this.onSubmit} onKeyPress={this.onKeyPress} name='order-submit' className='order-new__form'/>
            </div>
        )
    }
}

OrderNewForm = reduxForm({
    form: 'order-add'
})(OrderNewForm);

export default OrderNew;