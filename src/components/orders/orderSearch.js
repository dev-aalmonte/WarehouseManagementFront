import React, { Component } from 'react';

import { Heading, Text } from '../common/headings';
import { PlaceholderImage } from '../common/image';
import { FormButton } from '../formFields';

class OrderSearch extends Component {
    previousProduct() {
        console.log("Looking for the previous product");
    }

    acceptProduct() {
        console.log("Looking for the next product");
    }

    skipProduct() {
        console.log("Skipping product");
    }

    render() {
        return(
            <div className='order-search'>
                <Heading className='order-search__heading'>Product Name</Heading>
                <Text className='order-search__description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tellus ex, finibus id vehicula eu, tempus non mauris. Sed nec purus vitae augue volutpat viverra non quis ligula. Ut eget mauris id tellus sollicitudin sagittis. Fusce euismod dui vel nulla aliquam, id luctus mauris sodales. Phasellus pharetra cursus lacus in pulvinar. Quisque posuere diam non massa sodales aliquam. Suspendisse pellentesque fermentum nibh ut euismod. Cras ac pellentesque turpis. Morbi at orci ultrices, congue lorem in, sodales eros.</Text>
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

export default OrderSearch;