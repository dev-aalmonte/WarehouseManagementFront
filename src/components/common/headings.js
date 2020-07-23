import React, { Component } from 'react';

export class Heading extends Component {
    render() {
        const { className, children } = this.props;
        return (
            <div className={`${className} heading`}>
                {children}
            </div>
        )
    }
}

export class SmallHeading extends Component {
    render() {
        const { className, children, size, align } = this.props;
        return (
            <div className={`${className} small-heading ${size} ${align}`}>
                {children}
            </div>
        )
    }
}

export class Text extends Component {
    render() {
        const { className, align, children } = this.props;
        return (
            <div className={`${className} text ${align}`}>
                {children}
            </div>
        )
    }
}