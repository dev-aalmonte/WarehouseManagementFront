import {
    GET_ORDERS_PER_CLIENT,
    ADD_ORDER,
    ADD_ORDER_DETAIL,
} from '../actions/types';

const INITIAL_STATE = {
    pagination: {
        current_page: null,
        next_page_url: null,
        prev_page_url: null,
        last_page: null
    },
    orders: [],
    selected_order: {}
}

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case GET_ORDERS_PER_CLIENT:
            const { next_page_url, prev_page_url, current_page, last_page, data } = action.payload;
            return {
                ...state,
                pagination: {
                    current_page,
                    next_page_url,
                    prev_page_url,
                    last_page
                },
                orders: data
            }
        
        case ADD_ORDER:
        case ADD_ORDER_DETAIL:
        default: 
            return state;
    }
}