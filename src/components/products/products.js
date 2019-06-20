import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Searchbar from '../common/searchbar';
import { FormSmallButton } from '../formFields';
import Table from '../common/table';

class Products extends Component {
    componentWillMount() {
        this.props.getProducts();
    }

    openModal = (name) => {
        document.querySelector(`.modal-${name}`).classList.add('active');
    }

    render() {
        const tableHeader = ["Product", "Price", "Weight", "Longitude"];
        const columnTable = ["name", "price", "weight", ["width", "height", "length"]];
        const templateColumn = ["[data]", "$[data]", "[data]", "w:[data] h:[data] l:[data]"]
        const tableData = this.props.products;
        const pagination = this.props.pagination;
        return (
            <div className='products'>
                <Searchbar className='products-searchbar' placeholder='Search a Product' />
                <div className='products__buttoms'>
                    <FormSmallButton onClick={() => this.openModal('product_detail')} className='products__buttoms__button' type='button' icon='search'/>
                    <FormSmallButton className='products__buttoms__button' type='button' icon='search'/>
                    <FormSmallButton onClick={() => this.openModal('product_add')} className='products__buttoms__button' type='button' icon='search'/>
                </div>
                <Table className='products__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} pagination={pagination} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { products, pagination } = state.product;
    return { products, pagination };
}

export default connect(mapStateToProps, actions)(Products);