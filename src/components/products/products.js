import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Searchbar from '../common/searchbar';
import { FormSmallButton } from '../formFields';
import Table from '../common/table';
import Modal from '../common/modal';
import ProductDetail from './productDetail';
import ProductAdd from './productAdd';
import { notify, notifyConfirm, notifyRemove, notifyUpdate } from '../common/general';
import { PlaceholderImage } from '../common/image';
import { SmallHeading } from '../common/headings';

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
        else {
            notify('warn', 'You need to select only one item in order to edit');
        }
    }

    deleteProduct = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length > 0){
            notifyConfirm('Are you sure you want to delete it?', (toastID) => {
                notifyRemove(toastID);
                allElementsSelected.forEach((element) => {
                    element.classList.add('to_delete');
                    const rowID = this.props.products[element.id].id;
                    this.props.deleteProduct(rowID, () => {
                        this.resetTable();
                        this.resetActive();
                    });
                })
                notify('success', 'The products has been removed successfully');
            },
            (toastID) => {
                notifyRemove(toastID);
            })
        }
        else {
            notify('warn', 'You need to select at least one item in order to remove');

        }
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
                <div className='products__list'>
                    {
                        tableData ?
                        tableData.map((product, index) => {
                            return (
                                <div key={index} className='products__list__item' onDoubleClick={tableEvents.onDoubleClick}>
                                    <div className='products__list__item__image'>
                                        <PlaceholderImage width='100' height='100'></PlaceholderImage>
                                    </div>

                                    <SmallHeading className='products__list__item__title'>{product.name}</SmallHeading>
                                    <SmallHeading className='products__list__item__subtitle' size='xsmall'>Weight ({product.metric_weight}): {product.weight} - Longitude ({product.metric_longitude}): W:{product.width} H:{product.height} L:{product.length}</SmallHeading>
                                    <SmallHeading className='products__list__item__extra' size='small'>$ {product.price}</SmallHeading>
                                </div>
                            )
                        })
                        :
                        ""
                    }
                </div>
                <div className='products__pagination'>
                    <div className='products__pagination__pagination-info'>
                        Page: {pagination.current_page} of {pagination.last_page}
                    </div>
                    <div className='products__pagination__pagination-buttons'>
                        <FormSmallButton onClick={() => this.paginationOnClick(pagination.prev_page_url)} className={`products__pagination__pagination-buttons__button prev ${pagination.prev_page_url == null ? 'hidden' : '' }`} type='button' icon='angle-left'/>
                        <FormSmallButton onClick={() => this.paginationOnClick(pagination.next_page_url)} className={`products__pagination__pagination-buttons__button next ${pagination.next_page_url == null ? 'hidden' : '' }`} type='button' icon='angle-right'/>
                    </div>
                </div>
                {/* <Table className='products__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} pagination={pagination} events={tableEvents} /> */}

                <Modal className='modal-product_detail'> <ProductDetail/> </Modal>
                <Modal className='modal-product_add'> <ProductAdd/> </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { products, pagination } = state.product;
    return { products, pagination };
}

export default connect(mapStateToProps, actions)(Products);