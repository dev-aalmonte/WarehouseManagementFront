import React, { Component } from 'react';

class Modal extends Component {
    closeModal = (event) => {
        event.target.classList.remove('active');
        this.resetActive();
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    render() {
        const { className, children } = this.props;
        return (
            <div onClick={this.closeModal} className={`${className} modal`}>
                <div className='modal__content'>
                    { children }
                </div>
            </div>
        )
    }
}

export default Modal;