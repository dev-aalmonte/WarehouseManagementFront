import React, { Component } from 'react';

import { Heading, SmallHeading } from '../common/headings';
import Icon from '../common/icon';
import { FormButton } from '../formFields';

class OrderMessage extends Component {
    render() {
        return (
            <div className='order-message'>
                <Heading className='order-message__heading'>Your order has been created</Heading>
                <Icon className="order-message__icon" icon="check"/>
                <SmallHeading className='order-message__subheading' size='small'>Now we are looking the products in our warehouse in order to pack it and send it</SmallHeading>
                <div className='order-message__buttons'>
                    <FormButton className='order-message__buttons__button home' title="Back to Home" onClick={() => this.props.history.push('/home')}/>
                    <FormButton className='order-message__buttons__button order' title="Create new Order" onClick={() => this.props.history.push('/order/new')}/>
                </div>
            </div>
        )
    }
}

export default OrderMessage;