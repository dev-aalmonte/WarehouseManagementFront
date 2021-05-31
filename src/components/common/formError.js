import React, { Component } from 'react';

class FormError extends Component {

    render() {
        const { children, className, onClick } = this.props;
        return (
            <div className={`${className} form-error`} onClick={onClick}>
                {children}
            </div>
        )
    }
}

export default FormError;