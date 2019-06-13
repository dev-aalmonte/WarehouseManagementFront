import React, { Component } from 'react';

import { Heading } from '../common/headings';
import Table from '../common/table';

class OrderDetail extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className='order-detail'>
                <Heading className='order-detail__heading'>Order # {match.params.id}</Heading>
                <Table className='order-detail__table'/>
            </div>
        )
    }
}

export default OrderDetail;