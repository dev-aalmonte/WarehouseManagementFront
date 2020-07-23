import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Heading, Text, SmallHeading } from '../common/headings';
import { PlaceholderImage } from '../common/image';
import { FormButton, FormSmallButton } from '../formFields';
import Icon from '../common/icon';

class OrderShip extends Component {

    componentWillMount() {
        this.props.getSingleOrderFromDB(this.props.match.params.id);
    }

    checkProductPacked() {
        const order_detail = this.props.selected_order.order_detail;
        if(order_detail)
            return !order_detail.some((detail) => {
                return detail.packed != 1;
            })
        else 
            return false;
    }

    confirmProduct(orderDetailsID, isMissing) {
        const fields = {
            order_detail_id: orderDetailsID,
            user_id: this.props.user.id,
            type: 'ship',
            packed: (isMissing ? 2 : 1)
        };
        this.props.updateOrderProduct(fields, () => {
            this.props.getSingleOrderFromDB(this.props.match.params.id);
        });
    }

    packOrder() {
        const fields = {
            orderID: this.props.selected_order.id,
            statusID: 1
        }
        this.props.updateOrderStatus(fields, this.props.history.goBack);
    }

    render() {
        const order = this.props.selected_order;
        const products = order.order_details;
        const client = order.client;
        const allPacked = this.checkProductPacked();

        return (
            <div className='order-ship'>
                <Heading className='order-ship__heading'>
                    Order # {order.id}
                </Heading>
                <div className='order-ship__body'>
                    <div className='order-ship__body__client'>
                        <SmallHeading size='xsmall' className='order-ship__body__client__name' align='end'>{client ? `${client.first_name} ${client.last_name}` : '' } </SmallHeading>
                        <div className='order-ship__body__client__billing-address'>
                            <Text className='order-ship__body__client__billing-address__title' align='end'>Billing Adress:</Text>
                            <Text className='order-ship__body__client__billing-address__address' align='end'>
                                {client ? `${client.billing_address.street_address}, ${client.billing_address.extra_address}`: ''}
                            </Text>
                            <Text className='order-ship__body__client__billing-address__state' align='end'>
                                {client ? `${client.billing_address.city}, ${client.billing_address.state}, ${client.billing_address.country}, ${client.billing_address.zipcode}`: ''}
                            </Text>
                        </div>
                        <div className='order-ship__body__client__shipping-address'>
                            <Text className='order-ship__body__client__shipping-address__title' align='end'>Shipping Adress:</Text>
                            <Text className='order-ship__body__client__shipping-address__address' align='end'>
                                {client ? `${client.shipping_address.street_address}, ${client.shipping_address.extra_address}`: ''}
                            </Text>
                            <Text className='order-ship__body__client__shipping-address__state' align='end'>
                                {client ? `${client.shipping_address.city}, ${client.shipping_address.state}, ${client.shipping_address.country}, ${client.shipping_address.zipcode}`: ''}
                            </Text>
                        </div>
                    </div>
                    <div className='order-ship__body__products'>
                        {
                            products ?
                            products.map((product, index) => {
                                const order_detail = order.order_detail[index];
                                let highlight = '';
                                switch(order_detail.packed) {
                                    case 0:
                                        highlight = '';
                                        break;
                                    case 1:
                                        highlight = 'checked';
                                        break;
                                    case 2:
                                        highlight = 'missing';

                                }
                                return (
                                    <div key={index} className={`order-ship__body__products__product ${highlight}`}>
                                        <div className='order-ship__body__products__product__image'>
                                            <PlaceholderImage width="150" height="150"/>
                                        </div>
                                        <SmallHeading size="small" className='order-ship__body__products__product__name'>{product.name}</SmallHeading>
                                        <div className='order-ship__body__products__product__properties'>
                                            <Text className='order-ship__body__products__product__properties__dimension'>(W:{product.width} H:{product.height} L:{product.length}) {product.metric_longitude}</Text>
                                            <Text className='order-ship__body__products__product__properties__weight'>{product.weight} {product.metric_weight}</Text>
                                        </div>
                                        <div className='order-ship__body__products__product__actions'>
                                            <FormSmallButton onClick={() => this.confirmProduct(order_detail.id, false)} className='order-ship__body__products__product__actions__button' type='button' icon='check'/>
                                            <FormSmallButton onClick={() => this.confirmProduct(order_detail.id, true)} className='order-ship__body__products__product__actions__button danger' type='button' icon='exclamation'/>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            ""
                        }
                    </div>
                </div>
                <div className='order-ship__buttons'>
                    <FormButton onClick={() => this.packOrder()} className={`order-ship__body__buttons__button ${allPacked ? 'success' : 'warning'}`} title='Ship' type='button'/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { selected_order } = state.order;
    return { selected_order, user };
}

export default connect(mapStateToProps, actions)(OrderShip);