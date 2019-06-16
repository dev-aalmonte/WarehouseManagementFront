import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Header extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className='header'>
                <div className='header__logo'>
                    Header
                </div>
                <div className='header__user'>
                    <div className='header__user__welcome'>Welcome, {user.first_name}</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return { user };
}

export default connect(mapStateToProps, actions)(Header);