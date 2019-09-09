import React, { Component } from 'react';

class FormError extends Component {
    render() {
        const { children, className } = this.props;
        return (
            <div className={`${className} form-error`}>
                {children}
            </div>
        )
    }
}

export default FormError;