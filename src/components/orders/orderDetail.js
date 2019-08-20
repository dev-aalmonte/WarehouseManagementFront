import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Heading } from '../common/headings';
import Table from '../common/table';

class OrderDetail extends Component {
    componentWillMount() {
        const { match } = this.props;
        this.props.getSingleOrderFromDB(match.params.id);
    }

    render() {
        const { selected_order } = this.props;
        const data = [] 
        
        if(selected_order.order_details){
            this.props.selected_order.order_details.map((detail, index) => {
                data.push({
                    name: detail.name,
                    quantity: selected_order.order_detail ? selected_order.order_detail[index].quantity : '',
                    price: detail.price,
                    status: selected_order.status ? selected_order.status.name : ''
                });
            })
        }
        const tableHeader = ["Product Name", "Quantity", "Price", "Status"];
        const columnTable = [
                                'name', 
                                'quantity', 
                                'price', 
                                'status'
                            ];
        const templateColumn = ["[data]", "[data]", "$ [data]", "[data]"];
        const tableData = data;
        const tableEvents = {
            onDoubleClick: (event) => {
                // None
            }
        }

        const { match } = this.props;

        return (
            <div className='order-detail'>
                <Heading className='order-detail__heading'>Order # {match.params.id}</Heading>
                <Table className='order-detail__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} events={tableEvents} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { selected_order } = state.order;

    return { selected_order };
}

export default connect(mapStateToProps, actions)(OrderDetail);