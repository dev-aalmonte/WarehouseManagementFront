import {
    GET_CLIENTS,
    SELECT_SINGLE_CLIENT,
    ADD_CLIENTS,
    EDIT_CLIENTS,
    DELETE_CLIENTS,
    DISPLAY_CLIENT,
    UPLOAD_CLIENT_IMAGES,
    REMOVE_CLIENT_IMAGES,
} from '../actions/types';

const INITIAL_STATE = {
    pagination: {
        current_page: null,
        next_page_url: null,
        prev_page_url: null,
        last_page: null
    },
    clients: [],
    selected_client: {},
}

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case GET_CLIENTS: {
            const { next_page_url, prev_page_url, current_page, last_page, data } = action.payload;
            return {
                ...state,
                pagination: {
                    current_page,
                    next_page_url,
                    prev_page_url,
                    last_page
                },
                clients: data
            }
        }

        case SELECT_SINGLE_CLIENT:
            const id = action.payload;
            return {
                ...state,
                selected_client: id == -1 ? {} : state.clients[id]
            }
        
        case DISPLAY_CLIENT:
            return {
                ...state,
                selected_client: action.payload
            }

        case UPLOAD_CLIENT_IMAGES:
        case REMOVE_CLIENT_IMAGES:
        case ADD_CLIENTS:
        case EDIT_CLIENTS:
        case DELETE_CLIENTS:
        default: 
            return state;
    }
}