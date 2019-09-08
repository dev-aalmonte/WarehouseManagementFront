import React, { Component } from 'react';
import { Text } from './headings';
import { FormSmallButton } from '../formFields';

class NotifyTemplate extends Component {
    render() {
        const { children, success, decline } = this.props;
        return (
            <div className='notify-template'>
                <Text className='notify-template__text'>{children}</Text>
                <FormSmallButton onClick={success} className='notity-template__accept' type='button' icon='check'/>
                <FormSmallButton onClick={decline} className='notity-template__decline' type='button' icon='minus'/>
            </div>
        )
    }
}

export default NotifyTemplate;