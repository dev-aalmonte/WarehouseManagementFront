import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from '../common/table';
import { Heading } from '../common/headings';

class StockLocationShow extends Component {
    render() {
        const tableHeader = ["Location", "Stock"];
        const columnTable = ["location", "stock"];
        const templateColumn = ["[data]", "[data]"];
        const tableData = this.props.locations_on_stock;
        const tableEvents = {
            onDoubleClick: (event) => {
                
            }
        }
        return (
            <div className='location-item-show'>
                <div className='location-item-show__background'></div>
                <div className='location-item-show__content'>
                    <Heading className='location-item-show__content__title'>{this.props.selected_stock.product ? this.props.selected_stock.product.name : ""}</Heading>
                    <Table className='location-item-show__content__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} events={tableEvents} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { locations_on_stock, selected_stock } = state.warehouse;
    return { locations_on_stock, selected_stock };
}

export default connect(mapStateToProps)(StockLocationShow);