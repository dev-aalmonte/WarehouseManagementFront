import {
    GET_WAREHOUSES
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

        default: 
            return state;
    }
}