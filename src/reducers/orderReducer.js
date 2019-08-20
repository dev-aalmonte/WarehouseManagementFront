import {
    GET_ORDERS_PER_CLIENT,
    SELECT_SINGLE_ORDER_PER_CLIENT,
    SELECT_SINGLE_ORDER_FROM_DB,
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
        
        case SELECT_SINGLE_ORDER_PER_CLIENT:    
            const id = action.payload;
            return {
                ...state,
                selected_order: id == -1 ? {} : state.orders[id]
            }
        
        case SELECT_SINGLE_ORDER_FROM_DB:
            return {
                ...state,
                selected_order: action.payload
            }

        case ADD_ORDER:
        case ADD_ORDER_DETAIL:
        default: 
            return state;
    }
}