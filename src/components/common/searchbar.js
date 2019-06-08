import React, { Component } from 'react';

import Icon from './icon';
import { FormInput } from '../formFields';

class Searchbar extends Component {
    render() {
        const { className, placeholder } = this.props;
        return (
            <div className={`${className} searchbar`}>
                <Icon className='searchbar__icon' icon='search' />
                <FormInput className='searchbar__input' type='text' name='search' placeholder={placeholder} />
            </div>
        )
    }
}

export default Searchbar;