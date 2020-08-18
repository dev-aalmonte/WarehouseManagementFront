import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Searchbar from '../common/searchbar';
import { FormSmallButton } from '../formFields';
import Modal from '../common/modal';
import ProductDetail from './productDetail';
import ProductAdd from './productAdd';
import { notify, notifyConfirm, notifyRemove, notifyUpdate } from '../common/general';
import { PlaceholderImage } from '../common/image';
import { SmallHeading, Heading } from '../common/headings';
import Pagination from '../common/pagination';

// TODO: Import to delete
import Table from '../common/table';

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastSelectedIndex: null,
            activeKey: '',
            itemsPerPage: 6,
        }
    }
    
    componentWillMount() {
        this.props.getProducts(null, '', this.state.itemsPerPage);
    }

    onKeyDown(event) {
        if(this.state.activeKey !== 'Shift' && event.key == 'Shift'){
            this.setState({activeKey: event.key});
        }
    }

    onKeyUp(event) {
        if(this.state.activeKey === 'Shift' && event.key === 'Shift'){
            this.setState({activeKey: ''});
        }
    }

    rowOnClick = (event, index) => {
        const parent = event.target.parentElement;
        const parentIsActive = parent.classList.contains('active');

        const allElements = parent.parentElement.childNodes;
        
        if(parent.parentElement.classList.contains("table"))
            return;

        if(this.state.activeKey == 'Shift') {
            if(this.state.lastSelectedIndex == null)
                parent.classList.add('active');
            else if(this.state.lastSelectedIndex > index){
                const firstIndex = index;
                const lastIndex = this.state.lastSelectedIndex;

                allElements.forEach((element, index) => {
                    if(index >= firstIndex && index <= lastIndex)
                        element.classList.add('active');
                })
            }
            else if(this.state.lastSelectedIndex < index){
                const firstIndex = this.state.lastSelectedIndex;
                const lastIndex = index;

                allElements.forEach((element, index) => {
                    if(index >= firstIndex && index <= lastIndex)
                        element.classList.add('active');
                })
            }
        }
        else {
            allElements.forEach(element => {
                element.classList.remove('active');
            });

            if(!parentIsActive)
                parent.classList.add('active');
        }
        this.setState({lastSelectedIndex: index});
    }
    
    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getProducts(`http://127.0.0.1:8000/api/products?page=${current_page}`, '', this.state.itemsPerPage);
        else
            this.props.getProducts(null, '', this.state.itemsPerPage);
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

    onKeyDown(event) {
        if(this.state.activeKey !== 'Shift' && event.key == 'Shift'){
            this.setState({activeKey: event.key});
        }
    }

    onKeyUp(event) {
        if(this.state.activeKey === 'Shift' && event.key === 'Shift'){
            this.setState({activeKey: ''});
        }
    }

    render() {
        const tableHeader = ["Product", "Price", "Weight", "Longitude"];
        const columnTable = ["name", "price", "weight", ["width", "height", "length"]];
        const templateColumn = ["[data]", "$[data]", "[data]", "w:[data] h:[data] l:[data]"];
        const tableData = this.props.products;
        const pagination = this.props.pagination;
        const tableEvents = {
            onDoubleClick: (event, index) => {
                let parent = event.target.parentElement;
                while(parent.id == ""){
                    parent = parent.parentElement;
                }

                this.props.selectSingleProduct(index);
                this.openModal('product_detail');
            }
        }
        return (
            <div className='products'>
                <Heading className='products__heading'>Products</Heading>
                <Searchbar className='products-searchbar' placeholder='Search a Product' onKeyUp={this.displaySearchBarInput}/>
                <div className='products__buttoms'>
                    <FormSmallButton onClick={() => this.deleteProduct()} className='products__buttoms__button' type='button' icon='minus'/>
                    <FormSmallButton onClick={() => this.openEditProduct()} className='products__buttoms__button' type='button' icon='edit'/>
                    <FormSmallButton onClick={() => this.openAddProduct()} className='products__buttoms__button' type='button' icon='plus'/>
                </div>
                <div className='products__list' onKeyDownCapture={event => this.onKeyDown(event)}  onKeyUpCapture={event => this.onKeyUp(event)} tabIndex="0">
                    {
                        tableData ?
                        tableData.map((product, index) => {
                            return (
                                <div key={index} id={product.id} className='products__list__item' onClick={(event) => this.rowOnClick(event, index)} onDoubleClick={(event) => tableEvents.onDoubleClick(event, index)}>
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
                <Pagination className='products__pagination' pagination={pagination} fetch={this.props.getProducts} />
                {/* <Table className='products__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} pagination={pagination} events={tableEvents} /> */}

                <Modal className='modal-product_detail'> <ProductDetail/> </Modal>
                <Modal className='modal-product_add'> <ProductAdd/> </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { products, selected_product, pagination } = state.product;
    return { products, selected_product, pagination };
}

export default connect(mapStateToProps, actions)(Products);