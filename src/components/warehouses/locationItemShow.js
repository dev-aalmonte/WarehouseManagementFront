import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from '../common/table';
import { Heading } from '../common/headings';

class LocationItemShow extends Component {
    render() {
        const tableHeader = ["Product", "Price", "Stock"];
        const columnTable = ["name", "price", "stock"];
        const templateColumn = ["[data]", "$[data]", "[data]"];
        const tableData = this.props.products_on_location;
        const tableEvents = {
            onDoubleClick: (event) => {
                
            }
        }
        return (
            <div className='location-item-show'>
                <div className='location-item-show__background'></div>
                <div className='location-item-show__content'>
                    <Heading className='location-item-show__content__title'>{this.props.location.location}</Heading>
                    <Table className='location-item-show__content__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} events={tableEvents} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { products_on_location } = state.location;
    return { products_on_location };
}

export default connect(mapStateToProps)(LocationItemShow);