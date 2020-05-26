import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Searchbar from '../common/searchbar';
import { Heading } from '../common/headings';

class OrderHold extends Component {

    componentWillMount() {
        this.props.getOrdersPerStatus(3);
    }

    displaySearchBarInput = (event) => {
        const search = event.target.value;
        this.props.getOrdersPerStatus(3, null, search);
    }

    render() {
        return (
            <div className='orders-hold'>
                <Heading className='orders-hold__heading'>Hold Orders</Heading>
                <Searchbar className='orders-hold__searchbar' placeholder='Search by Order Number' onKeyUp={this.displaySearchBarInput} />
                <div className='orders-hold__body'>
                    <div className='orders-hold__body__list'>
                        <div className='orders-hold__body__list__list-item'>
                            <div className='orders-hold__body__list__list-item__status'>Status</div>
                            <div className='orders-hold__body__list__list-item__icon'>Icon</div>
                            <div className='orders-hold__body__list__list-item__order'>Order ID Here</div>
                            <div className='orders-hold__body__list__list-item__agent'>Agent Name Here</div>
                            <div className='orders-hold__body__list__list-item__button'>Buttons Actions Here</div>
                        </div>
                        <div className='orders-hold__body__list__list-item'>
                            <div className='orders-hold__body__list__list-item__status'>Status</div>
                            <div className='orders-hold__body__list__list-item__icon'>Icon</div>
                            <div className='orders-hold__body__list__list-item__order'>Order ID Here</div>
                            <div className='orders-hold__body__list__list-item__agent'>Agent Name Here</div>
                            <div className='orders-hold__body__list__list-item__button'>Buttons Actions Here</div>
                        </div><div className='orders-hold__body__list__list-item'>
                            <div className='orders-hold__body__list__list-item__status'>Status</div>
                            <div className='orders-hold__body__list__list-item__icon'>Icon</div>
                            <div className='orders-hold__body__list__list-item__order'>Order ID Here</div>
                            <div className='orders-hold__body__list__list-item__agent'>Agent Name Here</div>
                            <div className='orders-hold__body__list__list-item__button'>Buttons Actions Here</div>
                        </div><div className='orders-hold__body__list__list-item'>
                            <div className='orders-hold__body__list__list-item__status'>Status</div>
                            <div className='orders-hold__body__list__list-item__icon'>Icon</div>
                            <div className='orders-hold__body__list__list-item__order'>Order ID Here</div>
                            <div className='orders-hold__body__list__list-item__agent'>Agent Name Here</div>
                            <div className='orders-hold__body__list__list-item__button'>Buttons Actions Here</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { pagination, orders } = state.order;
    return { pagination, orders };
}

export default connect(mapStateToProps, actions)(OrderHold);