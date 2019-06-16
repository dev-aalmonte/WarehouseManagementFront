import {
    AUTHENTICATE_USER,
    LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
    authenticated: false,
    user: {}
}

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case AUTHENTICATE_USER:
            const user = action.payload;
            return {
                ...state,
                authenticated: true,
                user
            }

        case LOGOUT_USER:
            return {
                ...state,
                authenticated: false,
                user: {}
            }
        default: 
            return state;
    }
}