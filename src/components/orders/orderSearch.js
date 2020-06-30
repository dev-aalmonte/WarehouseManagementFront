import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Heading, Text } from '../common/headings';
import { PlaceholderImage } from '../common/image';
import { FormButton } from '../formFields';

class OrderSearch extends Component {

    componentWillMount() {
        this.props.getSingleOrderFromDB(this.props.match.params.id);
    }

    previousProduct = () => {
        this.props.previousProductList();
    }

    acceptProduct = () => {
        this.props.nextProductList();
    }

    skipProduct() {
        console.log("Skipping product");
    }

    render() {
        const products = this.props.selected_order.order_details;
        let index = this.props.product_index;

        let productName = products ? products[index].name : "";
        let productDescription = products ? products[index].description : "";
        return (
            <div className='order-search'>
                <Heading className='order-search__heading'>{productName}</Heading>
                <Text className='order-search__description'>{productDescription}</Text>
                <PlaceholderImage className='order-search__image' width='800' height='600'/>
                <div className='order-search__button-container'>
                    <FormButton className='order-search__button-container__button' title='Back' type='button' onClick={this.previousProduct} />
                    <FormButton className='order-search__button-container__button' title='Skip' type='button' onClick={this.skipProduct} />
                    <FormButton className='order-search__button-container__button' title='Accept' type='button' onClick={this.acceptProduct} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { selected_order, product_index } = state.order;
    return { selected_order, product_index };
}

export default connect(mapStateToProps, actions)(OrderSearch);