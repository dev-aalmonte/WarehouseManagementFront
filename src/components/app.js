import React, { Component } from 'react';

import Header from './common/header';

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
