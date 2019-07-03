import React, { Component } from 'react';
import { Heading } from '../common/headings';

class WarehouseDetail extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className='warehouse-detail'>
                <Heading>Warehouse Detail {match.params.id}</Heading>
            </div>
        )
    }
}

export default WarehouseDetail;