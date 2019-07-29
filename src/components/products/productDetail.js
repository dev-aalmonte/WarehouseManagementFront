import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Heading } from '../common/headings';
import Slideshow from '../common/slideshow';

class ProductDetail extends Component {
    render() {
        return (
            <div className='product-detail'>
                <div className='product-detail__slideshow'>
                    <Slideshow className='product-detail__slideshow__slideshow' imgs={[]}/>
                </div>
                <div className='product-detail__content'>
                    <Heading className='product-detail__title'>{this.props.selected_product.name}</Heading>
                    <div className='product-detail__content__description'>
                        {this.props.selected_product.description}
                    </div>
                    <div className='product-detail__content__price'>${this.props.selected_product.price}</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { selected_product } = state.product;
    return { selected_product };
}

export default connect(mapStateToProps)(ProductDetail);