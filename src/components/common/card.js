import React, { Component } from 'react';
import { Heading, SmallHeading } from './headings';
import Icon from './icon';

class Card extends Component {
    render() {
        const { className, title, icon } = this.props;
        return (
            <div className={`${className} card`}>
                <Icon className='card__icon' icon={icon ? icon : 'question-circle' } />
                <SmallHeading className='card__title'>{title}</SmallHeading>
            </div>
        )
    }
}

export default Card;