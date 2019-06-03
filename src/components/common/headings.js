import React, { Component } from 'react';

export class Heading extends Component {
    render(){
        const { className, children } = this.props;
        return (
            <div className={`${className} heading`}>
                {children}
            </div>
        )
    }
}