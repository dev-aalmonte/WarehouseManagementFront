import {
    GET_WAREHOUSES,
    SELECT_SINGLE_WAREHOUSE,
    ADD_WAREHOUSES,
    EDIT_WAREHOUSES,
    DELETE_WAREHOUSES
} from '../actions/types';

const INITIAL_STATE = {
    pagination: {
        current_page: null,
        next_page_url: null,
        prev_page_url: null,
        last_page: null
    },
    warehouses: [],
    selected_warehouse: {}
}

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case GET_WAREHOUSES:
            const { next_page_url, prev_page_url, current_page, last_page, data } = action.payload;
            return {
                ...state,
                pagination: {
                    current_page,
                    next_page_url,
                    prev_page_url,
                    last_page
                },
                warehouses: data
            }

        case SELECT_SINGLE_WAREHOUSE:
            const id = action.payload;
            return {
                ...state,
                selected_warehouse: id == -1 ? {} : state.warehouses[id]
            }

        case ADD_WAREHOUSES:
        case EDIT_WAREHOUSES:
        case DELETE_WAREHOUSES:
        default: 
            return state;
    }
}