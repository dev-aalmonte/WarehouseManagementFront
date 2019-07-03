import React, { Component } from 'react';

import { Heading, SmallHeading, Text } from '../common/headings';
import { FormSmallButton } from '../formFields';
import Searchbar from '../common/searchbar';
import Table from '../common/table';

class WarehouseDetail extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className='warehouse-detail'>
                <div className='warehouse-detail__heading'>
                    <Heading>Warehouse Detail {match.params.id}</Heading>
                    <Text>Address Here</Text>
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

export default WarehouseDetail;