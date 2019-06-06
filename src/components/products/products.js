import React, { Component } from 'react';

import Searchbar from '../common/searchbar';
import { FormSmallButton } from '../formFields';
import Table from '../common/table';

class Products extends Component {
    openModal = (name) => {
        console.log("Opening Modal");
        document.querySelector(`.modal-${name}`).classList.add('active');
    }

    render() {
        return (
            <div className='products'>
                <Searchbar className='products-searchbar' />
                <div className='products__buttoms'>
                    <FormSmallButton onClick={() => this.openModal('product_detail')} className='products__buttoms__button' type='button' icon='search'/>
                    <FormSmallButton className='products__buttoms__button' type='button' icon='search'/>
                    <FormSmallButton onClick={() => this.openModal('product_add')} className='products__buttoms__button' type='button' icon='search'/>
                </div>
                <Table className='products__table' />
            </div>
        )
    }
}

export default Products;