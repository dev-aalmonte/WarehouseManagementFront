import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { reduxForm, Field, FieldArray } from 'redux-form';

import { Heading } from '../common/headings';
import { FormSelect, FormList, FormButton, FormInput } from '../formFields';
import Icon from '../common/icon';

class OrderNewForm extends Component {
    componentWillMount() {
        this.props.getProducts();
        this.props.getClients();
    }

    listOnKeyUp = (event) => {
        const search = event.target.value;
        this.props.getProducts(null, search);
    }

    render() {
        const { className, handleSubmit, onKeyPress } = this.props;
        const listOption = {
            objectName: ['product', 'quantity', 'price'],
            objectValueInput: [null, '.order-add-form__quantity', 'price'],
            suggestion: {
                keyName: "name",
                event: {
                    onKeyUp: this.listOnKeyUp
                }
            }
        }
        const clientSelect = this.props.clients.map(client => {
            return {
                key: client.id,
                value: `${client.first_name} ${client.last_name}`
            }
        });
        const suggestionList = this.props.products;
        return (
            <form onSubmit={handleSubmit} onKeyPress={onKeyPress} className={`${className} order-add-form`}>
                <Field className='order-add-form__client' name='clientID' title='Client' placeholder='Select a Client' options={clientSelect} component={FormSelect} />
                <FieldArray className='order-add-form__products' suggestion={suggestionList} name='products' title='Product List' placeholder='Look for a product by the ID, SKU, or Name' component={FormList} options={listOption} componentList={[<Field className='order-add-form__quantity' name='quantity' title='Quantity' placeholder='Quantity' component={FormInput} />]}/>
                {/* Footer of the Field Array */}
                <div className='order-add-form__products-footer'>
                    <div className='order-add-form__products-footer__field subtotal'>
                        <label className='order-add-form__products-footer__field__label'>Subtotal: </label>
                        <div className='order-add-form__products-footer__field__text'><Icon className='order-add-form__products-footer__field__text__icon' icon='dollar-sign'/>0.00</div>
                    </div>
                    <div className='order-add-form__products-footer__field tax'>
                        <label className='order-add-form__products-footer__field__label'>Tax: </label>
                        <div className='order-add-form__products-footer__field__text'><Icon className='order-add-form__products-footer__field__text__icon' icon='dollar-sign'/>0.00</div>
                    </div>
                    <div className='order-add-form__products-footer__field shipping'>
                        <label className='order-add-form__products-footer__field__label'>Shipping: </label>
                        <div className='order-add-form__products-footer__field__text'><Icon className='order-add-form__products-footer__field__text__icon' icon='dollar-sign'/>0.00</div>
                    </div>
                    <div></div>
                    <div className='order-add-form__products-footer__field total'>
                        <label className='order-add-form__products-footer__field__label'>Total: </label>
                        <div className='order-add-form__products-footer__field__text'><Icon className='order-add-form__products-footer__field__text__icon' icon='dollar-sign'/>0.00</div>
                    </div>
                </div>
                {/* End Footer */}
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

function mapStateToProps(state){
    const { clients } = state.client;
    const { products } = state.product;

    return { clients, products };
}

OrderNewForm = connect(mapStateToProps, actions)(OrderNewForm);

export default connect(null, actions)(OrderNew);