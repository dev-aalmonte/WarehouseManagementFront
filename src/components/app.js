import React, { Component } from 'react';

import Header from './common/header';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle, faUsers, faArchive, faBoxes, faWarehouse, faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faQuestionCircle, faUsers, faArchive, faBoxes, faWarehouse, faSearch);

export default class App extends Component {
    render() {
        return (
            <div className='app'>
                <Header/>
                {this.props.children}
            </div>
        );
    }
}
