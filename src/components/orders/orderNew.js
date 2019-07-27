import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { reduxForm, Field, FieldArray } from 'redux-form';

import { Heading } from '../common/headings';
import { FormSelect, FormList, FormButton, FormInput } from '../formFields';

class OrderNewForm extends Component {
    listOnKeyUp = (event) => {
        const search = event.target.value;
        this.props.getProducts(null, search);
    }

    render() {
        const { className, handleSubmit, onKeyPress } = this.props;
        const listOption = {
            objectValueInput: [null, '.stock-add-form__stock'],
            suggestion: {
                keyName: null,
                event: {
                    onKeyUp: this.listOnKeyUp
                }
            }
        }
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
                <Field className='order-add-form__quantity' name='quantity' title='Quantity' placeholder='Quantity' component={FormInput} />
                <FieldArray className='order-add-form__products' suggestion={suggestionList} name='products' title='Product List' placeholder='Look for a product by the ID, SKU, or Name' component={FormList} options={listOption}/>
                <Field className='order-add-form__submit' name="submit" type='submit' title='Make order' onClick={() => console.log("Submiting order")} component={FormButton} />
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

OrderNewForm = connect(null, actions)(OrderNewForm);

export default connect(null, actions)(OrderNew);