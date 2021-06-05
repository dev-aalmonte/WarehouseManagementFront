import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { FormSmallButton } from '../formFields';

import Searchbar from '../common/searchbar';
import Table from '../common/table';
import { Heading, SmallHeading } from '../common/headings';
import { API_URL } from '../../config';
import Modal from '../common/modal';
import ClientAdd from './clientAdd';
import { notify, notifyConfirm, notifyRemove } from '../common/general';
import { PlaceholderImage } from '../common/image';

class Clients extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lastSelectedIndex: null,
            activeKey: '',
            itemsPerPage: 6,
            search: '',
        }
    }

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
        else {
            notify('warn', 'You need to select only one item in order to edit');
        }
    }

    deleteClient = () => {
        const allElementsSelected = document.querySelectorAll(`.table__body__row.active`);
        if(allElementsSelected.length > 0){
            notifyConfirm('Are you sure you want to delete it?', (toastID) => {
                notifyRemove(toastID);
                allElementsSelected.forEach((element) => {
                    element.classList.add('to_delete');
                    const rowID = this.props.clients[element.id].id;
                    this.props.deleteClient(rowID, () => {
                        this.resetTable();
                        this.resetActive();
                    });
                })
                notify('success', 'The client has been removed successfully');
            },
            (toastID) => {
                notifyRemove(toastID);
            })
        }
        else {
            notify('warn', 'You need to select at least one item in order to remove');
        }
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

    rowOnClick = (event, index) => {
        const parent = event.target.parentElement;
        const parentIsActive = parent.classList.contains('active');

        const allElements = parent.parentElement.childNodes;
        
        if(parent.parentElement.classList.contains("table"))
            return;

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

    displaySearchBarInput = (event) => {
        const search = event.target.value;
        this.props.getClients(null, search);
    }

    render() {
        // const tableHeader = ["Name", "Email", "Address"];
        // const columnTable = [["first_name", "last_name"], "email", {key:'billing_address', column: ['street_address', 'extra_address', 'city', 'state', 'country', 'zipcode']}];
        // const templateColumn = ["[data] [data]", "[data]", "[data] [data], [data], [data], [data], [data]"];
        const tableData = this.props.clients;
        const tableEvents = {
            onDoubleClick: (event, index) => {
                let parent = event.target;
                while(parent.id == "") {
                    parent = parent.parentElement;
                }

                // const clientID = this.props.clients[event.target.parentElement.id].id;
                this.props.selectSingleClient(index);
                this.props.history.push(`/client/${parent.id}`);
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
                <div className='clients__list' onKeyDownCapture={event => this.onKeyDown(event)}  onKeyUpCapture={event => this.onKeyUp(event)} tabIndex="0">
                    {
                        tableData ?
                        tableData.map((client, index) => {
                            const billing_address = client.billing_address
                            const address = `${billing_address.street_address} ${billing_address.extra_address}, ${billing_address.city}, ${billing_address.state}, ${billing_address.country}, ${billing_address.zipcode}`
                            return (
                                <div key={index} id={client.id} listindex={index} className='clients__list__client' onClick={(event) => this.rowOnClick(event, index)} onDoubleClick={(event) => tableEvents.onDoubleClick(event, index)}>
                                    <div className='clients__list__client__image-container'>
                                        <PlaceholderImage className='clients__list__client__image-container__image' width="100" height="100"/>
                                    </div>
                                    <SmallHeading className='clients__list__client__name'>{client.first_name} {client.last_name}</SmallHeading>
                                    <SmallHeading className='clients__list__client__address' size='small'>{address}</SmallHeading>
                                </div>
                            )
                        })
                        :
                        "" // TODO: Have to show something when is empty
                    }
                    
                </div>
                {/* <Table className='clients__table' heading={tableHeader} body={tableData} columnName={columnTable} template={templateColumn} events={tableEvents}  /> */}

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