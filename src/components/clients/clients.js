import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { FormSmallButton } from '../formFields';

import Searchbar from '../common/searchbar';
import Table from '../common/table';
import { Heading } from '../common/headings';
import { API_URL } from '../../config';
import Modal from '../common/modal';
import ClientAdd from './clientAdd';

class Clients extends Component {

    componentWillMount() {
        this.props.getClients();
    }

    resetTable() {
        const { current_page } = this.props.pagination;
        if(current_page != null)
            this.props.getClients(`${API_URL}/clients?page=${current_page}`)
        else
            this.props.getClients();
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    openModal = (name) => {
        document.querySelector(`.modal-${name}`).classList.add('active').focus();
    }
    
    openAddClient = () => {
        this.props.selectSingleClient(-1);
        this.openModal('client_add');
    }

    openEditClient = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length === 1){
            const selectedItem = allElementsSelected[0];
            this.props.selectSingleClient(selectedItem.id);
            this.openModal('client_add');
        }
    }

    deleteClient = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length > 0)
            allElementsSelected.forEach((element) => {
                element.classList.add('to_delete');
                const rowID = this.props.clients[element.id].id;
                this.props.deleteClient(rowID, () => {
                    this.resetTable();
                    this.resetActive();
                });
            })
    }

    displaySearchBarInput = (event) => {
        const search = event.target.value;
        this.props.getClients(null, search);
    }

    render() {
        const tableHeader = ["Name", "Email", "Address"];
        const columnTable = [["first_name", "last_name"], "email", {key:'billing_address', column: ['street_address', 'extra_address', 'city', 'state', 'country', 'zipcode']}];
        const templateColumn = ["[data] [data]", "[data]", "[data] [data], [data], [data], [data], [data]"];
        const tableData = this.props.clients;
        const tableEvents = {
            onDoubleClick: (event) => {
                const clientID = this.props.clients[event.target.parentElement.id].id;
                this.props.history.push(`/client/${clientID}`);
            }
        }
        return (
            <div className='clients'>
                <Heading className='clients__heading'>Clients</Heading>
                <Searchbar className='clients-searchbar' placeholder='Search a Client' onKeyUp={this.displaySearchBarInput} />
                <div className='clients__buttoms'>
                    <FormSmallButton onClick={() => this.deleteClient()} className='clients__buttoms__button' type='button' icon='minus'/>
                    <FormSmallButton onClick={() => this.openEditClient()} className='clients__buttoms__button' type='button' icon='edit'/>
                    <FormSmallButton onClick={() => this.openAddClient()} className='clients__buttoms__button' type='button' icon='plus'/>
                </div>
                <Table className='clients__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} events={tableEvents}  />

                <Modal className='modal-client_add'> <ClientAdd/> </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { pagination, clients } = state.client;
    return { pagination, clients };
}

export default connect(mapStateToProps, actions)(Clients);