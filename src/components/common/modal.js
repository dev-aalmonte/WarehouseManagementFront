import React, { Component } from 'react';

class Modal extends Component {
    closeModal = (event) => {
        event.target.classList.remove('active');
        this.resetActive();
    }

    onKeyUp = (event) => {
        if(event.key == "Escape")
            this.closeModal(event);
    }

    resetActive() {
        document.querySelectorAll(`.table__body__row`).forEach((element) => {
            element.classList.remove('active');
            element.classList.remove('to_delete');
        })
    }

    render() {
        const { className, children, type = 'normal' } = this.props;
        return (
            <div onClick={this.closeModal} onKeyUp={(e) => this.onKeyUp(e)} className={`${className} modal ${type}`} tabIndex='0'>
                <div className='modal__content'>
                    { children }
                </div>
            </div>
        )
    }
}

export default Modal;