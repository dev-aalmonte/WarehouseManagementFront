import React, { Component } from 'react';

import { Heading } from '../common/headings';
import Slideshow from '../common/slideshow';

class ProductDetail extends Component {
    render() {
        return (
            <div className='product-detail'>
                <div className='product-detail__slideshow'>
                    <Slideshow className='product-detail__slideshow__slideshow' imgs={[
                        '../../../static/assets/temp/1.jpg',
                        '../../../static/assets/temp/2.jpg',
                        '../../../static/assets/temp/3.jpg',
                    ]}/>
                </div>
                <div className='product-detail__content'>
                    <Heading className='product-detail__title'>Product Detail</Heading>
                    <div className='product-detail__content__description'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tellus ex, finibus id vehicula eu, tempus non mauris. Sed nec purus vitae augue volutpat viverra non quis ligula. Ut eget mauris id tellus sollicitudin sagittis. Fusce euismod dui vel nulla aliquam.
                    </div>

                </div>
            </div>
        )
    }
}

export default ProductDetail;