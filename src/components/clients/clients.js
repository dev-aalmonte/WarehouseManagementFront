import React, { Component } from 'react';

import { FormSmallButton } from '../formFields';

import Searchbar from '../common/searchbar';
import Table from '../common/table';
import { Heading } from '../common/headings';

class Clients extends Component {

    openModal = (name) => {
        document.querySelector(`.modal-${name}`).classList.add('active');
    }
    
    openAddClient = () => {
        console.log("Goes here");
        // this.props.selectSingleProduct(-1);
        this.openModal('client_add');
    }
    render() {
        return (
            <div className='clients'>
                <Heading className='clients__heading'>Clients</Heading>
                <Searchbar className='clients-searchbar' placeholder='Search a Client' />
                <div className='clients__buttoms'>
                    <FormSmallButton onClick={() => 0} className='clients__buttoms__button' type='button' icon='minus'/>
                    <FormSmallButton onClick={() => 0} className='clients__buttoms__button' type='button' icon='edit'/>
                    <FormSmallButton onClick={() => this.openAddClient()} className='clients__buttoms__button' type='button' icon='plus'/>
                </div>
                <Table className='clients__table' />
            </div>
        )
    }
}

export default Clients;