import React, { Component } from 'react';

import { FormSmallButton } from '../formFields';

import Searchbar from '../common/searchbar';
import Table from '../common/table';
import { Heading } from '../common/headings';

class Clients extends Component {
    render() {
        return(
            <div className='clients'>
                <Heading className='clients__heading'>Clients</Heading>
                <Searchbar className='clients-searchbar' placeholder='Search a Client' />
                <div className='clients__buttoms'>
                    <FormSmallButton onClick={() => 0} className='clients__buttoms__button' type='button' icon='minus'/>
                    <FormSmallButton onClick={() => 0} className='clients__buttoms__button' type='button' icon='edit'/>
                    <FormSmallButton onClick={() => 0} className='clients__buttoms__button' type='button' icon='plus'/>
                </div>
                <Table className='clients__table' />
            </div>
        )
    }
}

export default Clients;