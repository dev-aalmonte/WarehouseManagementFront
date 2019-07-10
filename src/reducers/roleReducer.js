import {
    GET_ROLES,
    SELECT_SINGLE_ROLE,
    ADD_ROLE,
    EDIT_ROLE,
    DELETE_ROLE,
    DISPLAY_ROLE
} from '../actions/types';

const INITIAL_STATE = {
    pagination: {
        current_page: null,
        next_page_url: null,
        prev_page_url: null,
        last_page: null
    },
    roles: [],
    selected_role: {}
}

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case GET_ROLES:
            const { next_page_url, prev_page_url, current_page, last_page, data } = action.payload;
            return {
                ...state,
                pagination: {
                    current_page,
                    next_page_url,
                    prev_page_url,
                    last_page
                },
                roles: data
            }

        case SELECT_SINGLE_ROLE:
            const id = action.payload;
            return {
                ...state,
                selected_role: id == -1 ? {} : state.roles[id]
            }
        
        case DISPLAY_ROLE:
            return {
                ...state,
                selected_role: action.payload
            }
        
        case ADD_ROLE:
        case EDIT_ROLE:
        case DELETE_ROLE:
        default: 
            return state;
    }
}