import React, { Component } from 'react';

import { Heading, Text } from '../common/headings';
import Table from '../common/table';
import Searchbar from '../common/searchbar';

class Client extends Component {
    render() {
        const { match } = this.props;
        return(
            <div className='client'>
                <Heading className='client__heading'>Client {match.params.id}</Heading>
                <Text className='client__description' >Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tellus ex, finibus id vehicula eu, tempus non mauris. Sed nec purus vitae augue volutpat viverra non quis ligula. Ut eget mauris id tellus sollicitudin sagittis. Fusce euismod dui vel nulla aliquam, id luctus mauris sodales. Phasellus pharetra cursus lacus in pulvinar. Quisque posuere diam non massa sodales aliquam. Suspendisse pellentesque fermentum nibh ut euismod. Cras ac pellentesque turpis. Morbi at orci ultrices, congue lorem in, sodales eros.</Text>
                <Heading className='client__order-heading'>Orders</Heading>
                <Searchbar className='client__order-searchbar' placeholder='Search for Order' />
                <Table className='client__order-table'/>
            </div>
        )
    }
}

export default Client;