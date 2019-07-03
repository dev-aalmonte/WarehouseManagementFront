import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Searchbar from '../common/searchbar';
import Table from '../common/table';
import { FormSmallButton } from '../formFields';

class Warehouses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastSelectedIndex: null,
            activeKey: ''
        }
    }
    
    componentWillMount() {
        this.props.getWarehouses();
    }

    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getWarehouses(`http://127.0.0.1:8000/api/warehouses?page=${current_page}`)
        else
            this.props.getWarehouses();
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    openModal = (name) => {
        document.querySelector(`.modal-${name}`).classList.add('active');
    }

    onKeyDown(event) {
        if(this.state.activeKey !== 'Shift' && event.key == 'Shift'){
            this.setState({activeKey: event.key});
        }
    }

    onKeyUp(event) {
        if(this.state.activeKey === 'Shift' && event.key === 'Shift'){
            this.setState({activeKey: ''});
        }
    }

    openAddWarehouse = () => {
        this.props.selectSingleWarehouse(-1);
        this.openModal('warehouse_add');
    }

    openEditWarehouse = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length === 1){
            const selectedItem = allElementsSelected[0];
            this.props.selectSingleWarehouse(selectedItem.id);
            this.openModal('warehouse_add');
        }
    }

    deleteWarehouse = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length > 0)
            allElementsSelected.forEach((element) => {
                element.classList.add('to_delete');
                const rowID = this.props.warehouses[element.id].id;
                this.props.deleteWarehouse(rowID, () => {
                    this.resetTable();
                    this.resetActive();
                });
            })
    }

    render() {
        const tableHeader = ["Warehouse", "Address"];
        const columnTable = ["name", "addressID"];
        const templateColumn = ["[data]", "[data]"];
        const tableData = this.props.warehouses;
        const tableEvents = {
            onDoubleClick: (event) => {
                const warehouseID = this.props.warehouses[event.target.parentElement.id].id;
                this.props.history.push(`/warehouse/${warehouseID}`);
            },
            onClick: (event, index) => {
                const parent = event.target.parentElement;
                const parentIsActive = parent.classList.contains('active');
                const allElements = document.querySelectorAll(`.table__body__row`);
                
                if(this.state.activeKey == 'Shift') {
                    if(this.state.lastSelectedIndex == null)
                        parent.classList.add('active');
                    else if(this.state.lastSelectedIndex > index){
                        const firstIndex = index;
                        const lastIndex = this.state.lastSelectedIndex;

                        allElements.forEach((element, index) => {
                            if(index >= firstIndex && index <= lastIndex)
                                element.classList.add('active');
                        })
                    }
                    else if(this.state.lastSelectedIndex < index){
                        const firstIndex = this.state.lastSelectedIndex;
                        const lastIndex = index;

                        allElements.forEach((element, index) => {
                            if(index >= firstIndex && index <= lastIndex)
                                element.classList.add('active');
                        })
                    }
                }
                else {
                    allElements.forEach(element => {
                        element.classList.remove('active');
                    });

                    if(!parentIsActive)
                        parent.classList.add('active');
                }
                
                this.setState({lastSelectedIndex: index});
            }
        }
        return (
            <div className='warehouses'>
                <Searchbar className='warehouses__searchbar' placeholder='Search a Warehouse' onKeyUp={this.displaySearchBarInput}/>
                <div className='warehouses__buttoms'>
                    <FormSmallButton onClick={() => this.deleteWarehouse()} className='warehouses__buttoms__button' type='button' icon='minus'/>
                    <FormSmallButton onClick={() => this.openEditWarehouse()} className='warehouses__buttoms__button' type='button' icon='edit'/>
                    <FormSmallButton onClick={() => this.openAddWarehouse()} className='warehouses__buttoms__button' type='button' icon='plus'/>
                </div>
                <Table className='warehouses__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} events={tableEvents} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { pagination, warehouses } = state.warehouse;
    return { pagination, warehouses };
}

export default connect(mapStateToProps, actions)(Warehouses);