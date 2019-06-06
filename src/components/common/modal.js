import React, { Component } from 'react';

import { Heading } from './headings';

class Modal extends Component {
    render() {
        const { className, children } = this.props;
        return (
            <div className={`${className} modal`}>
                <div className='modal__content'>
                    { children }
                </div>
            </div>
        )
    }
}

export default Modal;