import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Icon extends Component {
    render() {
        const { className, icon } = this.props;
        return (
            <FontAwesomeIcon className={`${className} icon`} icon={icon} />
        )
    }
}

export default Icon;