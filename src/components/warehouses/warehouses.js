import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Searchbar from '../common/searchbar';
import Table from '../common/table';
import { FormSmallButton } from '../formFields';
import Modal from '../common/modal';
import WarehouseAdd from './warehouseAdd';
import { notify, notifyConfirm, notifyRemove } from '../common/general';

class Warehouses extends Component {
    
    componentWillMount() {
        this.props.getWarehouses();
    }

    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getWarehouses(`http://127.0.0.1:8000/api/warehouses?page=${current_page}`)
        else
            this.props.getWarehouses();
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

    openAddWarehouse = () => {
        this.props.selectSingleWarehouse(-1);
        this.openModal('warehouse_add');
    }

    openEditWarehouse = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length === 1){
            const selectedItem = allElementsSelected[0];
            this.props.selectSingleWarehouse(selectedItem.id);
            this.openModal('warehouse_add');
        }
        else {
            notify('warn', 'You need to select only one item in order to edit');
        }
    }

    deleteWarehouse = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length > 0) {
            notifyConfirm("Are you sure you want to delete it?", (toastID) => {
                notifyRemove(toastID);
                allElementsSelected.forEach((element) => {
                    element.classList.add('to_delete');
                    const rowID = this.props.warehouses[element.id].id;
                    this.props.deleteWarehouse(rowID, () => {
                        this.resetTable();
                        this.resetActive();
                    });
                })
                notify('success', 'The warehouse has been removed successfully');
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
        this.props.getWarehouses(null, search);
    }

    render() {
        const tableHeader = ["Warehouse", "Address"];
        const columnTable = ["name", {key:'address', column: ['street_address', 'extra_address', 'city', 'state', 'country', 'zipcode']}];
        const templateColumn = ["[data]", "[data] [data], [data], [data], [data], [data]"];
        const tableData = this.props.warehouses;
        const tableEvents = {
            onDoubleClick: (event) => {
                const warehouseID = this.props.warehouses[event.target.parentElement.id].id;
                this.props.history.push(`/warehouse/${warehouseID}`);
            }
        }
        return (
            <div className='warehouses'>
                <Searchbar className='warehouses__searchbar' placeholder='Search a Warehouse' onKeyUp={this.displaySearchBarInput}/>
                <div className='warehouses__buttoms'>
                    <FormSmallButton onClick={() => this.deleteWarehouse()} className='warehouses__buttoms__button' type='button' icon='minus'/>
                    <FormSmallButton onClick={() => this.openEditWarehouse()} className='warehouses__buttoms__button' type='button' icon='edit'/>
                    <FormSmallButton onClick={() => this.openAddWarehouse()} className='warehouses__buttoms__button' type='button' icon='plus'/>
                </div>
                <Table className='warehouses__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} events={tableEvents} />

                <Modal className='modal-warehouse_add'> <WarehouseAdd/> </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { pagination, warehouses } = state.warehouse;
    return { pagination, warehouses };
}

export default connect(mapStateToProps, actions)(Warehouses);