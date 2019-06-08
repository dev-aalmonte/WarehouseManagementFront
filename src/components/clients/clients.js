import React, { Component } from 'react';

import Searchbar from '../common/searchbar';
import Table from '../common/table';

class Clients extends Component {
    render() {
        return(
            <div className='clients'>
                <Searchbar className='clients-searchbar' placeholder='Search a Client' />
                <Table className='clients__table' />
            </div>
        )
    }
}

export default Clients;