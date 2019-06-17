import React, { Component } from 'react';

import { BackgroundImage } from './common/image';
import Card from './common/card';

import background from '../../static/assets/img/login-img.jpg';

class Home extends Component {
    toClients = () => {
        this.props.history.push('/clients');
    }

    toProducts = () => {
        this.props.history.push('/products');
    }

    toOrders = () => {
        this.props.history.push('/order/new');
    }

    toOrderSearch = () => {
        this.props.history.push('/order/search/10');
    }

    render() {
        return (
            <div className='home'>
                <div className='home__background'>
                    <BackgroundImage className='home__background__image' src={background}/>
                </div>
                <div className='home__content'>
                    <Card className='home__content__card' title='Client' icon='users' onClick={this.toClients} />
                    <Card className='home__content__card' title='Order' icon='archive' onClick={this.toOrders} />
                    <Card className='home__content__card' title='Product' icon='boxes' onClick={this.toProducts}/>
                    <Card className='home__content__card' title='Search'icon='search' onClick={this.toOrderSearch}/>
                </div>
            </div>
        )
    }
}

export default Home;