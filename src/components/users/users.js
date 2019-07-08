import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Heading } from '../common/headings';
import Searchbar from '../common/searchbar';
import { FormSmallButton } from '../formFields';
import Table from '../common/table';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastSelectedIndex: null,
            activeKey: ''
        }
    }
    
    componentWillMount() {
        this.props.getUsers();
    }

    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getUsers(`http://127.0.0.1:8000/api/users?page=${current_page}`)
        else
            this.props.getUsers();
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

    openAddUser = () => {
        this.props.selectSingleUser(-1);
        // this.openModal('warehouse_add');
    }

    openEditUser = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length === 1){
            const selectedItem = allElementsSelected[0];
            this.props.selectSingleUser(selectedItem.id);
            // this.openModal('warehouse_add');
        }
    }

    deleteUser = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length > 0)
            allElementsSelected.forEach((element) => {
                element.classList.add('to_delete');
                const rowID = this.props.warehouses[element.id].id;
                this.props.deleteUser(rowID, () => {
                    this.resetTable();
                    this.resetActive();
                });
            })
    }

    render() {
        const tableHeader = ["Name", "Warehouse", "Role"];
        const columnTable = ["first_name", "warehouseID", "roleID"];
        const templateColumn = ["[data]", "[data]", "[data]"];
        const tableData = this.props.users;
        const tableEvents = {
            onDoubleClick: (event) => {
                // For now just nothing
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
            <div className='users'>
                <Searchbar className='users__searchbar' placeholder='Search a Warehouse' onKeyUp={this.displaySearchBarInput}/>
                <div className='users__buttoms'>
                    <FormSmallButton onClick={() => this.deleteWarehouse()} className='users__buttoms__button' type='button' icon='minus'/>
                    <FormSmallButton onClick={() => this.openEditWarehouse()} className='users__buttoms__button' type='button' icon='edit'/>
                    <FormSmallButton onClick={() => this.openAddWarehouse()} className='users__buttoms__button' type='button' icon='plus'/>
                </div>
                <Table className='users__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} events={tableEvents} />
            </div>
        )
    }
}

function mapSateToProps(state) {
    const { pagination, users } = state.user;
    return { pagination, users };
}

export default connect(mapSateToProps, actions)(Users);