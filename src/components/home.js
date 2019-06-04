import React, { Component } from 'react';

import { BackgroundImage } from './common/image';
import Card from './common/card';

import background from '../../static/assets/img/login-img.jpg';

class Home extends Component {
    render() {
        return (
            <div className='home'>
                <div className='home__background'>
                    <BackgroundImage className='home__background__image' src={background}/>
                </div>
                <div className='home__content'>
                    <Card className='home__content__card' title='Client' icon='users' />
                    <Card className='home__content__card' title='Order' icon='archive' />
                    <Card className='home__content__card' title='Product' icon='boxes' />
                    <Card className='home__content__card' title='Search'icon='search' />
                </div>
            </div>
        )
    }
}

export default Home;