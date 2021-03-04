import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Heading } from '../common/headings';
import Searchbar from '../common/searchbar';
import { FormSmallButton } from '../formFields';
import Table from '../common/table';
import Modal from '../common/modal';
import UserAdd from './userAdd';
import { notify, notifyConfirm, notifyRemove } from '../common/general';
import { toast } from 'react-toastify';

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

    openAddUser = () => {
        this.props.selectSingleUser(-1);
        this.openModal('user_add');
    }

    openEditUser = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length === 1){
            const selectedItem = allElementsSelected[0];
            this.props.selectSingleUser(selectedItem.id);
            this.openModal('user_add');
        }
        else {
            notify('warn', 'You need to select onyl one item in order to edit');
        }
    }

    deleteUser = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length > 0){
            notifyConfirm("Are you sure you want to delete it?", (toastID) => {
                notifyRemove(toastID);
                allElementsSelected.forEach((element) => {
                    element.classList.add('to_delete');
                    const rowID = this.props.users[element.id].id;
                    this.props.deleteUser(rowID, () => {
                        this.resetTable();
                        this.resetActive();
                    });
                })
                notify('success', 'The user has been removed successfully');
            },
            (toastID) => {
                notifyRemove(toastID);
            })
        }
        else {
            notify('warn', 'You need to select at least one item in order to remove');
        }
    }

    displaySearchBarInput = (event) => {
        const search = event.target.value;
        this.props.getUsers(null, search);
    }

    render() {
        const tableHeader = ["Name", "Warehouse", "Role"];
        const columnTable = [["first_name", "last_name"], {key: 'warehouse', column: 'name'}, {key: 'role', column: 'role'}];
        const templateColumn = ["[data] [data]", "[data]", "[data]"];
        const tableData = this.props.users;
        const tableEvents = {
            onDoubleClick: (event) => {
                // For now just nothing
            }
        }
        return (
            <div className='users'>
                <Heading className='users__heading'>Users</Heading>
                <Searchbar className='users__searchbar' placeholder='Search a Warehouse' onKeyUp={this.displaySearchBarInput}/>
                <div className='users__buttoms'>
                    <FormSmallButton onClick={() => this.deleteUser()} className='users__buttoms__button' type='button' icon='minus'/>
                    <FormSmallButton onClick={() => this.openEditUser()} className='users__buttoms__button' type='button' icon='edit'/>
                    <FormSmallButton onClick={() => this.openAddUser()} className='users__buttoms__button' type='button' icon='plus'/>
                </div>
                <Table className='users__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} events={tableEvents} />
                
                <Modal className='modal-user_add'> <UserAdd/> </Modal>
            </div>
        )
    }
}

function mapSateToProps(state) {
    const { pagination, users } = state.user;
    return { pagination, users };
}

export default connect(mapSateToProps, actions)(Users);