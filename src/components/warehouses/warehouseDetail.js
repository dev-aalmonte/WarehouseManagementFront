import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Heading, SmallHeading, Text } from '../common/headings';
import { FormSmallButton } from '../formFields';
import Searchbar from '../common/searchbar';
import Table from '../common/table';

class WarehouseDetail extends Component {
    componentWillMount() {
        this.props.selectSingleWarehouseFromDB(this.props.match.params.id);
    }

    render() {
        const { selected_warehouse } = this.props;
        const { name, address } = selected_warehouse;
        console.log("Address: ", address);
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
                            <FormSmallButton onClick={() => this.deleteWarehouse()} className='warehouse-detail__products__table-container__buttoms__button' type='button' icon='minus'/>
                            <FormSmallButton onClick={() => this.openEditWarehouse()} className='warehouse-detail__products__table-container__buttoms__button' type='button' icon='edit'/>
                            <FormSmallButton onClick={() => this.openAddWarehouse()} className='warehouse-detail__products__table-container__buttoms__button' type='button' icon='plus'/>
                        </div>
                        <Table className='warehouse-detail__products__table-container__table' />
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