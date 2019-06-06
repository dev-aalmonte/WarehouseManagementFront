import React, { Component } from 'react';
import Icon from './icon';

class Slideshow extends Component {
    render() {
        const { className, imgs } = this.props;
        return (
            <div className={`${className} slideshow`}>
                <div className='slideshow__image-container'>
                    <img className='slideshow__image-container__image' src={null} />
                </div>
                <div className='slideshow__back-control'>
                    <Icon className='slideshow__back-control__icon' icon='angle-left' />
                </div>
                <div className='slideshow__bulletpoint'>
                    {
                        imgs.map((img, index) => {
                            return (
                                <div key={index} className='slideshow__bulletpoint__bullet'></div>
                            )
                        })
                    }
                </div>
                <div className='slideshow__foward-control'>
                    <Icon className='slideshow__foward-control__icon' icon='angle-right' />
                </div>
            </div>
        )
    }
}

export default Slideshow;