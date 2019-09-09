import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { API_URL } from '../../config';

import { Heading } from '../common/headings';
import { FormInput, FormButton, FormList } from '../formFields';
import Icon from '../common/icon';
import { notify } from '../common/general';

class OrderAddForm extends Component {
    componentWillMount(){
        this.props.getProducts();
    }

    listOnKeyUp = (event) => {
        const search = event.target.value;
        this.props.getProducts(null, search);
    }

    render() {
        const { className, handleSubmit, onKeyPress } = this.props;
        const listOption = {
            objectName: ['product', 'quantity', 'price'],
            objectValueInput: [null, '.order-add-modal-form__quantity', 'price'],
            suggestion: {
                keyName: "name",
                event: {
                    onKeyUp: this.listOnKeyUp
                }
            }
        }

        const suggestionList = this.props.products;

        let subtotal = 0;
        const tax = 0;
        const shipping = 0;

        if(this.props.actualForm && this.props.actualForm.values){
            const products = this.props.actualForm.values.products;
            if(products) {
                products.map((product) => {
                    subtotal += Number(product.price) * Number(product.quantity);
                })
            }
        }

        const total = subtotal + tax + shipping;
        return (
            <form onSubmit={handleSubmit} onKeyPress={onKeyPress} className={`${className} order-add-modal-form`}>
                <FieldArray className='order-add-modal-form__products' suggestion={suggestionList} name='products' title='Product List' placeholder='Look for a product by the ID, SKU, or Name' component={FormList} options={listOption} componentList={[<Field className='order-add-modal-form__quantity' name='quantity' title='Quantity' placeholder='Quantity' component={FormInput} />]}/>
                {/* Footer of the Field Array */}
                <div className='order-add-modal-form__products-footer'>
                    <div className='order-add-modal-form__products-footer__field subtotal'>
                        <label className='order-add-modal-form__products-footer__field__label'>Subtotal: </label>
                        <div className='order-add-modal-form__products-footer__field__text'><Icon className='order-add-modal-form__products-footer__field__text__icon' icon='dollar-sign'/>{parseFloat(subtotal).toFixed(2)}</div>
                    </div>
                    <div className='order-add-modal-form__products-footer__field tax'>
                        <label className='order-add-modal-form__products-footer__field__label'>Tax: </label>
                        <div className='order-add-modal-form__products-footer__field__text'><Icon className='order-add-modal-form__products-footer__field__text__icon' icon='dollar-sign'/>{parseFloat(tax).toFixed(2)}</div>
                    </div>
                    <div className='order-add-modal-form__products-footer__field shipping'>
                        <label className='order-add-modal-form__products-footer__field__label'>Shipping: </label>
                        <div className='order-add-modal-form__products-footer__field__text'><Icon className='order-add-modal-form__products-footer__field__text__icon' icon='dollar-sign'/>{parseFloat(shipping).toFixed(2)}</div>
                    </div>
                    <div></div>
                    <div className='order-add-modal-form__products-footer__field total'>
                        <label className='order-add-modal-form__products-footer__field__label'>Total: </label>
                        <div className='order-add-modal-form__products-footer__field__text'><Icon className='order-add-modal-form__products-footer__field__text__icon' icon='dollar-sign'/>{parseFloat(total).toFixed(2)}</div>
                    </div>
                </div>
                {/* End Footer */}
                <Field className='order-add-modal-form__submit' type='submit' name='submit' title='Add Product' onClick={() => console.log('submiting Product')} component={FormButton}/>
            </form>
        )
    }
}

class OrderAdd extends Component {
    resetTable(id) {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getOrdersPerClient(id)
        else
            this.props.getOrdersPerClient(id);
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

    onKeyPress = (event) => {
        if (event.key === 'Enter')
            event.preventDefault();
    }

    onSubmit = (fields) => {
        const subtotal = Number(document.querySelector('.subtotal > div').textContent);
        const tax = Number(document.querySelector('.tax > div').textContent);
        const shipping = Number(document.querySelector('.shipping > div').textContent);
        const total = Number(document.querySelector('.total > div').textContent);
        
        fields.clientID = this.props.selected_client.id;
        fields.subtotal = subtotal;
        fields.tax = tax;
        fields.shipping = shipping;
        fields.total = total;
        
        this.props.addOrder(fields, (res) => {
            fields.products.map((product, index) => {
                const fieldsDetails = {
                    orderID: res.data.id,
                    productID: product.product.id,
                    quantity: product.quantity
                }

                this.props.addOrderDetail(fieldsDetails, () => {
                    document.querySelectorAll('.modal').forEach((element) => {
                        notify('success', 'The order has been added successfully');
                        element.classList.remove('active');
                        this.resetTable(this.props.selected_client.id);
                        this.resetActive();
                    })
                })
            })        
        });
    }

    render() {
        return (
            <div className={`order-add-modal`}>
                <div className='order-add-modal__background'></div>
                <div className='order-add-modal__content'>
                    <Heading className='order-add-modal__title'>Add Order</Heading>
                    <OrderAddForm onSubmit={(e) => this.onSubmit(e)} onKeyPress={this.onKeyPress} className='order-add-modal__content__form' />
                </div>
            </div>
        )
    }
}


OrderAddForm = reduxForm({
    form: 'order-add-modal',
    enableReinitialize: true
})(OrderAddForm);

function mapStateToProps(state){
    const { selected_client } = state.client;
    const { products } = state.product;
    const actualForm = state.form['order-add-modal'];

    return { selected_client, products, actualForm };
}

OrderAddForm = connect(mapStateToProps, actions)(OrderAddForm);

export default connect((state) => {
    const { selected_client } = state.client;
    const { pagination } = state.order;

    return { selected_client, pagination };
}, actions)(OrderAdd);