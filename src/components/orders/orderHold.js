import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Searchbar from '../common/searchbar';
import Icon from '../common/icon';
import StatusCircle from '../common/statusCircle';
import Modal from '../common/modal';
import { Heading } from '../common/headings';
import { FormSmallButton, FormSelect } from '../formFields';
import OrderAssignUser from './orderAssignUser';

class OrderHold extends Component {

    componentWillMount() {
        this.props.getOrdersPerStatus(-1);
        this.props.getStatusByProperty(2);
    }

    displaySearchBarInput = (event) => {
        const search = event.target.value;
        this.props.getOrdersPerStatus(-1, null, search);
    }

    sortTable = (value) => {
        this.props.getOrdersPerStatus(value);
    }

    openModal = (name) => {
        document.querySelector(`.modal-${name}`).classList.add('active');
    }

    openAssignUser = (orderID) => {
        this.props.getSingleOrderFromDB(orderID);
        this.openModal('assign_user');
    }

    startOrder(orderID, statusID) {
        switch(statusID) {
            case 1: // Packed
                break;
            case 3: // Hold
                this.props.history.push(`/order/search/${orderID}`);
                break
            case 4: // Picked
                this.props.history.push(`/order/ship/${orderID}`);
                break;
            case 6: // Completed
            case 7: // Shipped
                break;
        }
    }

    cancelOrder() {
        
    }

    getIconOrder(statusID) {
        switch(statusID) {
            case 1: // Packed
                return 'box';
            case 3: // Hold
                return 'clock';
            case 4: // Picked
                return 'shopping-cart';
            case 6: // Completed
                return 'home';
            case 7: // Shipped
                return 'truck';
        }
    }

    render() {
        const data = this.props.orders;
        const sortOptions = this.props.status.map(status => {
            return {
                key: status.id,
                value: status.name
            }
        });
        sortOptions.splice(0, 0, {
            key: -1,
            value: "All"
        })
        return (
            <div className='orders-hold'>
                <Heading className='orders-hold__heading'>Hold Orders</Heading>
                <div className='orders-hold__search-form'>
                    <Searchbar className='orders-hold__search-form__searchbar' placeholder='Search by Order Number' onKeyUp={this.displaySearchBarInput} />
                    <FormSelect className='orders-hold__search-form__sort' placeholder='Sort By' options={sortOptions} onChangeEvent={this.sortTable}/> 
                </div>
                <div className='orders-hold__body'>
                    <div className='orders-hold__body__list'>
                        {
                            data ?
                            data.map((order, index) => {
                                const icon = this.getIconOrder(order.statusID)
                                return (
                                    <div key={index} className='orders-hold__body__list__list-item'>
                                        <div className='orders-hold__body__list__list-item__status'><StatusCircle className='orders-hold__body__list__list-item__status__status-circle' status='available'/></div>
                                        <div className='orders-hold__body__list__list-item__icon'><Icon className='orders-hold__body__list__list-item__icon__icon' icon={icon} /></div>
                                        <div className='orders-hold__body__list__list-item__order'>Order #: {order.id}</div>
                                        <div className='orders-hold__body__list__list-item__agent'>{order.client.first_name} {order.client.last_name} {order.order_users.length > 0 ? `- Assigned to ${order.order_users[order.order_users.length - 1].first_name} ${order.order_users[order.order_users.length - 1].last_name}` : ""} </div>
                                        <div className='orders-hold__body__list__list-item__buttons'>
                                            <FormSmallButton onClick={() => this.openAssignUser(order.id)} className='orders-hold__body__list__list-item__buttons__button' type='button' icon='user-plus'/>
                                            <FormSmallButton onClick={() => this.startOrder(order.id, order.statusID)} className='orders-hold__body__list__list-item__buttons__button' type='button' icon='check'/>
                                            <FormSmallButton onClick={() => this.cancelOrder()} className='orders-hold__body__list__list-item__buttons__button danger' type='button' icon='minus'/>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            ""
                        }
                    </div>
                </div>
                <Modal className='modal-assign_user'> <OrderAssignUser /> </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { pagination, orders } = state.order;
    const { status } = state.status;
    return { pagination, orders, status };
}

export default connect(mapStateToProps, actions)(OrderHold);