import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Heading, Text, SmallHeading } from '../common/headings';
import Table from '../common/table';
import Searchbar from '../common/searchbar';
import { FormSmallButton } from '../formFields';
import Modal from '../common/modal';
import OrderAdd from '../orders/orderAdd';

class Client extends Component {

    componentWillMount() {
        this.props.selectSingleClientFromDB(this.props.match.params.id);
        this.props.getOrdersPerClient(this.props.match.params.id);
    }

    openModal = (name) => {
        document.querySelector(`.modal-${name}`).classList.add('active');
    }
    
    openAddOrder = () => {
        this.openModal('order_add');
    }

    render() {
        const tableHeader = ["OrderID", "Subtotal", "Total", "Status"];
        const columnTable = [["id"], ["subtotal"], ["total"], {key:"status", column:['name']}];
        const templateColumn = ["# [data]", "$ [data]", "$ [data]", "[data]"];
        const tableData = this.props.orders;
        const tableEvents = {
            onDoubleClick: (event) => {
                const parent = event.target.parentElement;
                const orderID = parent.children[0].innerHTML.split(" ")[1];
                this.props.getSingleOrderPerClient(parent.id);
                this.props.history.push(`/order/detail/${orderID}`);
            }
        }
        return (
            <div className='client'>
                <Heading className='client__heading'>{this.props.selected_client.first_name} {this.props.selected_client.last_name}</Heading>
                <SmallHeading className='client__small-heading' size='xsmall'>{this.props.selected_client.email}</SmallHeading>
                <Text className='client__description'>{this.props.selected_client.description ? this.props.selected_client.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tellus ex, finibus id vehicula eu, tempus non mauris. Sed nec purus vitae augue volutpat viverra non quis ligula. Ut eget mauris id tellus sollicitudin sagittis. Fusce euismod dui vel nulla aliquam, id luctus mauris sodales. Phasellus pharetra cursus lacus in pulvinar. Quisque posuere diam non massa sodales aliquam. Suspendisse pellentesque fermentum nibh ut euismod. Cras ac pellentesque turpis. Morbi at orci ultrices, congue lorem in, sodales eros." }</Text>
                <Heading className='client__order-heading'>Orders</Heading>
                <div className='client__order-searchbar-container'>
                    <Searchbar className='client__order-searchbar-container__searchbar' placeholder='Search for Order' />
                    <FormSmallButton onClick={() => this.openAddOrder()} className='client__order-searchbar-container__button' type='button' icon='plus'/>
                </div>
                <Table className='client__order-table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} events={tableEvents}/>
                <Modal className='modal-order_add'> <OrderAdd/> </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { selected_client } = state.client;
    const { orders, pagination } = state.order;
    return { selected_client, pagination, orders };
}

export default connect(mapStateToProps, actions)(Client);