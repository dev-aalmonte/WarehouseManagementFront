import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { notify, notifyConfirm, notifyUpdate, notifyRemove } from '../common/general';

import { Heading, Text } from '../common/headings';
import { FormSmallButton } from '../formFields';
import Searchbar from '../common/searchbar';
import Table from '../common/table';
import Modal from '../common/modal';
import StockAdd from './stockAdd';
import StockEdit from './stockEdit';
import Tabs from '../common/tabs';

class WarehouseDetail extends Component {
    componentWillMount() {
        this.props.selectSingleWarehouseFromDB(this.props.match.params.id);
        this.props.getStockPerWarehouse(this.props.match.params.id);
        this.props.getStatusByProperty(1);
    }

    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getStockPerWarehouse(this.props.match.params.id, `http://127.0.0.1:8000/api/stock?page=${current_page}`)
        else
            this.props.getStockPerWarehouse(this.props.match.params.id);
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

    openAddStock = () => {
        // Remove actual Stock
        this.openModal('stock_add');
    }

    openEditStock = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length === 1){
            const selectedItem = allElementsSelected[0];
            this.props.selectSingleStock(selectedItem.id);
            this.openModal('stock_edit');
        }
        else {
            notify('warn', 'You need to select only one item in order to edit');
        }
    }

    deleteStock = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length > 0){
            notifyConfirm("Are you sure you want to delete it?", (toastID) => {
                notifyRemove(toastID);
                allElementsSelected.forEach((element) => {
                    element.classList.add('to_delete');
                    const rowID = this.props.stocks[element.id].id;
                    this.props.deleteStock(rowID, () => {
                        this.resetTable();
                        this.resetActive();
                    });
                })
                notify('success', 'The product has been removed successfully from the warehouse');
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
        this.props.getStockPerWarehouse(this.props.match.params.id, null, search);
    }

    render() {
        const { selected_warehouse } = this.props;
        const { name, address } = selected_warehouse;

        const tableHeader = ["Product", "Stock", "Status"];
        const columnTable = [ {key: 'product', column: 'name'}, "stock", {key: 'status', column: 'name'} ];
        const templateColumn = ["[data]", "[data]", "[data]"];
        const tableData = this.props.stocks;
        const tableEvents = {
            onDoubleClick: (event) => {
                const elementChildren = event.target.parentElement.children;
                elementChildren[elementChildren.length - 1].innerText = elementChildren[elementChildren.length - 1].innerText == "Not Available" ? "Available" : "Not Available";
                const stock = this.props.stocks[event.target.parentElement.id];
                const fieldsToSubmit = {
                    id: stock.id,
                    stock: stock.stock,
                    statusID: stock.statusID == 2 ? 5 : 2
                }

                this.props.editStock(fieldsToSubmit, () => {
                    this.resetTable();
                    this.resetActive();
                });
            }
        }
        return (
            <div className='warehouse-detail'>
                <div className='warehouse-detail__heading'>
                    <Heading>{name}</Heading>
                    <Text>{address ? `${address.street_address} ${address.extra_address}, ${address.city}, ${address.state}, ${address.country}, ${address.zipcode}` : ''}</Text>
                </div>
                <Tabs className='warehouse-detail__tabs' tabName={['Products', 'Location']}>
                    <div id='Products' className='warehouse-detail__products tabs__content__tab active'>
                        <Heading>Products</Heading>
                        <div className='warehouse-detail__products__table-container'>
                            <Searchbar className='warehouse-detail__products__table-container__searchbar' placeholder='Search a Product' onKeyUp={this.displaySearchBarInput}/>
                            <div className='warehouse-detail__products__table-container__buttoms'>
                                <FormSmallButton onClick={() => this.deleteStock()} className='warehouse-detail__products__table-container__buttoms__button' type='button' icon='minus'/>
                                <FormSmallButton onClick={() => this.openEditStock()} className='warehouse-detail__products__table-container__buttoms__button' type='button' icon='edit'/>
                                <FormSmallButton onClick={() => this.openAddStock()} className='warehouse-detail__products__table-container__buttoms__button' type='button' icon='plus'/>
                            </div>

                            <Table className='warehouse-detail__products__table-container__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} events={tableEvents} />
                        </div>
                    </div>
                    <div id='Location' className='warehouse-detail__location tabs__content__tab'>
                        <Heading>Location</Heading>
                    </div>
                </Tabs>

                <Modal className='modal-stock_add'> <StockAdd/> </Modal>
                <Modal className='modal-stock_edit'> <StockEdit/> </Modal>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { selected_warehouse, stocks, pagination } = state.warehouse;
    return { selected_warehouse, stocks, pagination };
}

export default connect(mapStateToProps, actions)(WarehouseDetail);