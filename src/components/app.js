import React, { Component } from 'react';

import Header from './common/header';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle, faUsers, faArchive, faBoxes, faWarehouse, faSearch, faAngleLeft, faAngleRight, faAngleDown, faPlus, faSignOutAlt, faEdit, faMinus, faUser } from '@fortawesome/free-solid-svg-icons';

import Modal from './common/modal';
import ProductDetail from './products/productDetail';
import ProductAdd from './products/productAdd';
import WarehouseAdd from './warehouses/warehouseAdd';
import UserAdd from './users/userAdd';
import StockAdd from './warehouses/stockAdd';

library.add(faQuestionCircle, faUsers, faArchive, faBoxes, faWarehouse, faSearch, faAngleLeft, faAngleRight, faAngleDown, faPlus, faSignOutAlt, faEdit, faMinus, faUser);

export default class App extends Component {
    render() {
        return (
            <div className='app'>
                <Header actual_page={window.location.href}/>
                {this.props.children}

                {/* Product Modal */}
                <Modal className='modal-product_detail'> <ProductDetail/> </Modal>
                <Modal className='modal-product_add'> <ProductAdd/> </Modal>

                {/* Warehouse Modal */}
                <Modal className='modal-warehouse_add'> <WarehouseAdd/> </Modal>

                {/* User Modal */}
                <Modal className='modal-user_add'> <UserAdd/> </Modal>

                {/* Stock Modal */}
                <Modal className='modal-stock_add'> <StockAdd/> </Modal>
            </div>
        );
    }
}
