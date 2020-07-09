import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Heading, Text } from '../common/headings';
import { PlaceholderImage } from '../common/image';
import { FormButton } from '../formFields';
import Icon from '../common/icon';

class OrderSearch extends Component {

    componentWillMount() {
        this.props.getSingleOrderFromDB(this.props.match.params.id);
    }

    previousProduct = () => {
        this.props.previousProductList();
    }

    acceptProduct = () => {
        const index = this.props.product_index;
        const order_detail = this.props.selected_order.order_detail;
        const picked = order_detail[index].picked;
        if(!picked){
            const fields = {
                order_detail_id: order_detail[index].id,
                user_id: this.props.user.id
            }
            this.props.pickProduct(fields, this.props.nextProductList);
            this.props.getSingleOrderFromDB(this.props.match.params.id);
        }
        else {
            let listPicked = true;
            order_detail.forEach(product => {
                if(!product.picked){
                    listPicked = false;
                }
            });
            if(listPicked) {
                // Change the order status and go back to the hold screen
                const fields = {
                    orderID: this.props.selected_order.id,
                    statusID: 4
                }
                this.props.updateOrderStatus(fields, this.props.history.goBack);
            }
        }
        this.props.nextProductList();
    }

    skipProduct() {
        console.log("Skipping product");
    }

    render() {
        const products = this.props.selected_order.order_details;
        const index = this.props.product_index;

        const productName = products ? products[index].name : "";
        const productDescription = products ? products[index].description : "";
        const productPicked = products ? this.props.selected_order.order_detail[index].picked : 0;
        return (
            <div className='order-search'>
                <Heading className='order-search__heading'>
                    {productName}
                    {
                        productPicked == 1 ?
                        <Icon className='order-search__heading__icon' icon='check'/>
                        :
                        ""
                    }
                </Heading>
                <Text className='order-search__description'>
                    {productDescription}
                </Text>
                <PlaceholderImage className='order-search__image' width='800' height='600'/>
                <div className='order-search__button-container'>
                    <FormButton className='order-search__button-container__button' title='Back' type='button' onClick={this.previousProduct} />
                    <FormButton className='order-search__button-container__button' title='Skip' type='button' onClick={this.skipProduct} />
                    <FormButton className='order-search__button-container__button' title={productPicked ? 'Next' : 'Accept'} type='button' onClick={this.acceptProduct} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { selected_order, product_index } = state.order;
    return { selected_order, product_index, user };
}

export default connect(mapStateToProps, actions)(OrderSearch);