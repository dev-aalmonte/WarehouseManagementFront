import React, { Component } from 'react';

import Header from './common/header';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle, 
        faUsers, 
        faArchive, 
        faBoxes, 
        faWarehouse, 
        faSearch, 
        faAngleLeft, 
        faAngleRight, 
        faAngleDown, 
        faPlus, 
        faSignOutAlt, 
        faEdit, 
        faMinus, 
        faUser, 
        faDollarSign, 
        faCheck} from '@fortawesome/free-solid-svg-icons';

library.add(faQuestionCircle, 
            faUsers, 
            faArchive, 
            faBoxes, 
            faWarehouse, 
            faSearch, 
            faAngleLeft, 
            faAngleRight, 
            faAngleDown, 
            faPlus, 
            faSignOutAlt, 
            faEdit, 
            faMinus, 
            faUser,
            faDollarSign,
            faCheck);

export default class App extends Component {
    render() {
        return (
            <div className='app'>
                <Header actual_page={window.location.href}/>
                {this.props.children}
            </div>
        );
    }
}
