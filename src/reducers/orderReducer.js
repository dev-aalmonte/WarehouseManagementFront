import {
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
        
        case ADD_ORDER:
        case ADD_ORDER_DETAIL:
        default: 
            return state;
    }
}