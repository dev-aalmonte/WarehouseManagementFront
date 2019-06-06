import React, { Component } from 'react';
import Icon from './icon';

class Slideshow extends Component {
    constructor (props) {
        super(props);

        this.state = {
            imageList: props.imgs,
            currentImageIndex: 0,
            lastIndex: props.imgs.length - 1,
        }
    }

    selectImage = (event, index) => {
        document.querySelectorAll('.slideshow__bulletpoint__bullet').forEach(element => {
            element.classList.remove('active');
        });
        event.target.classList.add('active');
        this.setState({currentImageIndex: index});
    }
    
    moveFoward = () => {
        document.querySelectorAll('.slideshow__bulletpoint__bullet').forEach(element => {
            element.classList.remove('active');
        });
        const { currentImageIndex, lastIndex } = this.state;
        let index;
        if(currentImageIndex == lastIndex) {
            index = 0;
        }
        else {
            index = currentImageIndex + 1;
        }
        document.querySelectorAll('.slideshow__bulletpoint__bullet')[index].classList.add('active');
        this.setState({currentImageIndex: index});

    }
    
    moveBackward = () => {
        document.querySelectorAll('.slideshow__bulletpoint__bullet').forEach(element => {
            element.classList.remove('active');
        });
        const { currentImageIndex, lastIndex } = this.state;
        let index;
        if(currentImageIndex == 0) {
            index = lastIndex;
        }
        else {
            index = currentImageIndex - 1;
        }
        document.querySelectorAll('.slideshow__bulletpoint__bullet')[index].classList.add('active');
        this.setState({currentImageIndex: index});
    }
    
    render() {
        const { className } = this.props;
        const { imageList, currentImageIndex } = this.state;
        return (
            <div className={`${className} slideshow`}>
                <div className='slideshow__image-container'>
                    <img className='slideshow__image-container__image' src={imageList[currentImageIndex]} />
                </div>
                <div onClick={this.moveBackward} className='slideshow__back-control'>
                    <Icon className='slideshow__back-control__icon' icon='angle-left' />
                </div>
                <div className='slideshow__bulletpoint'>
                    {
                        imageList.map((img, index) => {
                            const active = index == 0 ? 'active' : '';
                            return (
                                <div key={index} className={`slideshow__bulletpoint__bullet ${active}`} onClick={(event) => this.selectImage(event, index)}></div>
                            )
                        })
                    }
                </div>
                <div onClick={this.moveFoward} className='slideshow__foward-control'>
                    <Icon className='slideshow__foward-control__icon' icon='angle-right' />
                </div>
            </div>
        )
    }
}

export default Slideshow;