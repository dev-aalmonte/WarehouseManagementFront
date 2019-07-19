import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Heading, Text } from '../common/headings';
import { FormSmallButton } from '../formFields';
import Searchbar from '../common/searchbar';
import Table from '../common/table';

class WarehouseDetail extends Component {
    componentWillMount() {
        this.props.selectSingleWarehouseFromDB(this.props.match.params.id);
        this.props.getStockPerWarehouse(this.props.match.params.id);
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
            // Get Actual stock
            this.openModal('stock_add');
        }
    }

    deleteStock = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length > 0)
            allElementsSelected.forEach((element) => {
                element.classList.add('to_delete');
                const rowID = this.props.warehouses[element.id].id;
                console.log("Deleting Stock");
                // this.props.deleteWarehouse(rowID, () => {
                //     this.resetTable();
                //     this.resetActive();
                // });
            })
    }

    render() {
        const { selected_warehouse } = this.props;
        const { name, address } = selected_warehouse;

        const tableHeader = ["Product", "Stock", "Status"];
        
        return (
            <div className='warehouse-detail'>
                <div className='warehouse-detail__heading'>
                    <Heading>{name}</Heading>
                    <Text>{address ? `${address.street_address} ${address.extra_address}, ${address.city}, ${address.state}, ${address.country}, ${address.zipcode}` : ''}</Text>
                </div>
                <div className='warehouse-detail__products'>
                    <Heading>Products</Heading>
                    <div className='warehouse-detail__products__table-container'>
                        <Searchbar className='warehouse-detail__products__table-container__searchbar' placeholder='Search a Warehouse' onKeyUp={this.displaySearchBarInput}/>
                        <div className='warehouse-detail__products__table-container__buttoms'>
                            <FormSmallButton onClick={() => this.deleteStock()} className='warehouse-detail__products__table-container__buttoms__button' type='button' icon='minus'/>
                            <FormSmallButton onClick={() => this.openEditStock()} className='warehouse-detail__products__table-container__buttoms__button' type='button' icon='edit'/>
                            <FormSmallButton onClick={() => this.openAddStock()} className='warehouse-detail__products__table-container__buttoms__button' type='button' icon='plus'/>
                        </div>
                        <Table className='warehouse-detail__products__table-container__table' heading={tableHeader} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { selected_warehouse } = state.warehouse;
    return { selected_warehouse };
}

export default connect(mapStateToProps, actions)(WarehouseDetail);