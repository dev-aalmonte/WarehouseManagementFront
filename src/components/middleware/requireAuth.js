import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export default function(ComposedComponent){
    class Authentication extends Component {
        componentWillMount() {
            const localToken = localStorage.getItem('token');
            const isUserEmpty = Object.entries(this.props.user).length === 0 && this.props.user.constructor === Object;
            
            if(localToken !== null && isUserEmpty)
                this.props.getUserByToken(localToken, (user) => {
                    if(!user){
                        this.props.history.push('/');
                    }
                });
            
        }

        render () {
            return <ComposedComponent {...this.props}/>
        }

    }
    
    function mapStateToProps(state){
        const { authenticated, user } = state.auth;
        return { authenticated, user }
    }

    return connect(mapStateToProps, actions)(Authentication);
}