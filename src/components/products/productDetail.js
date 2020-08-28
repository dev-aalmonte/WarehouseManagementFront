import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Heading } from '../common/headings';
import Slideshow from '../common/slideshow';
import { STORAGE_URL } from '../../config';

class ProductDetail extends Component {

    getImagePath() {
        if(this.props.selected_product){
            const { images } =  this.props.selected_product;
            let pathArray = [];
    
            if(images) {
                images.forEach(image => {
                    pathArray.push(STORAGE_URL + image.path);
                });
            }
    
            return pathArray;
        }
    }

    render() {
        const pathArray = this.getImagePath();
        const productName = this.props.selected_product ? this.props.selected_product.name : "";
        const productDescription = this.props.selected_product ? this.props.selected_product.description : "";
        const productPrice = this.props.selected_product ? this.props.selected_product.price : "";

        return (
            <div className='product-detail'>
                <div className='product-detail__slideshow'>
                    <Slideshow className='product-detail__slideshow__slideshow' imgs={pathArray}/>
                </div>
                <div className='product-detail__content'>
                    <Heading className='product-detail__title'>{productName}</Heading>
                    <div className='product-detail__content__description'>
                        {productDescription || ""}
                    </div>
                    <div className='product-detail__content__price'>${productPrice || ""}</div>
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