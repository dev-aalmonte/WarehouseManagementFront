import {
    GET_STATUS,
    SELECT_SINGLE_STATUS,
    ADD_STATUS,
    EDIT_STATUS,
    DELETE_STATUS,
    DISPLAY_STATUS
} from '../actions/types';

const INITIAL_STATE = {
    status: []
}

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case GET_STATUS:
            const status = action.payload;
            return {
                ...state,
                status
            }

        case SELECT_SINGLE_STATUS:
            const id = action.payload;
            return {
                ...state,
                selected_status: id == -1 ? {} : state.status[id]
            }
        
        case DISPLAY_STATUS:
            return {
                ...state,
                selected_status: action.payload
            }
        
        case ADD_STATUS:
        case EDIT_STATUS:
        case DELETE_STATUS:
        default: 
            return state;
    }
}