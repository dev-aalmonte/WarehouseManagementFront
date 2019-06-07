import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Icon extends Component {
    render() {
        const { className, icon, onClick } = this.props;
        return (
            <FontAwesomeIcon onClick={onClick ? onClick : f => f} className={`${className} icon`} icon={icon} />
        )
    }
}

export default Icon;