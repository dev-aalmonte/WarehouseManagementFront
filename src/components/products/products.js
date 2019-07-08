import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Searchbar from '../common/searchbar';
import { FormSmallButton } from '../formFields';
import Table from '../common/table';

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastSelectedIndex: null,
            activeKey: ''
        }
    }
    
    componentWillMount() {
        this.props.getProducts();
    }
    
    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getProducts(`http://127.0.0.1:8000/api/products?page=${current_page}`)
        else
            this.props.getProducts();
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    openModal = (name) => {
        document.querySelector(`.modal-${name}`).classList.add('active');
    }

    openAddProduct = () => {
        this.props.selectSingleProduct(-1);
        this.openModal('product_add');
    }

    openEditProduct = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length === 1){
            const selectedItem = allElementsSelected[0];
            this.props.selectSingleProduct(selectedItem.id);
            this.openModal('product_add');
        }
    }

    deleteProduct = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length > 0)
            allElementsSelected.forEach((element) => {
                element.classList.add('to_delete');
                const rowID = this.props.products[element.id].id;
                this.props.deleteProduct(rowID, () => {
                    this.resetTable();
                    this.resetActive();
                });
            })
    }

    displaySearchBarInput = (event) => {
        const search = event.target.value;
        this.props.getProducts(null, search);
    }

    render() {
        const tableHeader = ["Product", "Price", "Weight", "Longitude"];
        const columnTable = ["name", "price", "weight", ["width", "height", "length"]];
        const templateColumn = ["[data]", "$[data]", "[data]", "w:[data] h:[data] l:[data]"]
        const tableData = this.props.products;
        const pagination = this.props.pagination;
        const tableEvents = {
            onDoubleClick: (event) => {
                const parent = event.target.parentElement;
                this.props.selectSingleProduct(parent.id);
                this.openModal('product_detail');
            }
        }
        return (
            <div className='products'>
                <Searchbar className='products-searchbar' placeholder='Search a Product' onKeyUp={this.displaySearchBarInput}/>
                <div className='products__buttoms'>
                    <FormSmallButton onClick={() => this.deleteProduct()} className='products__buttoms__button' type='button' icon='minus'/>
                    <FormSmallButton onClick={() => this.openEditProduct()} className='products__buttoms__button' type='button' icon='edit'/>
                    <FormSmallButton onClick={() => this.openAddProduct()} className='products__buttoms__button' type='button' icon='plus'/>
                </div>
                <Table className='products__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} pagination={pagination} events={tableEvents} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { products, pagination } = state.product;
    return { products, pagination };
}

export default connect(mapStateToProps, actions)(Products);