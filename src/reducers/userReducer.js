import {
    GET_USERS,
    SELECT_SINGLE_USER,
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
    DISPLAY_USER
} from '../actions/types';

const INITIAL_STATE = {
    pagination: {
        current_page: null,
        next_page_url: null,
        prev_page_url: null,
        last_page: null
    },
    users: [],
    selected_user: {}
}

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case GET_USERS:
            const { next_page_url, prev_page_url, current_page, last_page, data } = action.payload;
            return {
                ...state,
                pagination: {
                    current_page,
                    next_page_url,
                    prev_page_url,
                    last_page
                },
                users: data
            }

        case SELECT_SINGLE_USER:
            const id = action.payload;
            return {
                ...state,
                selected_user: id == -1 ? {} : state.users[id]
            }
        
        case DISPLAY_USER:
            return {
                ...state,
                selected_user: action.payload
            }
        
        case ADD_USER:
        case EDIT_USER:
        case DELETE_USER:
        default: 
            return state;
    }
}