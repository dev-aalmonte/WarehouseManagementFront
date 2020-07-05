import {
    GET_ORDERS_PER_CLIENT,
    SELECT_SINGLE_ORDER_PER_CLIENT,
    SELECT_SINGLE_ORDER_FROM_DB,
    ADD_ORDER,
    ADD_ORDER_DETAIL,
    ASSIGN_USER_ORDER,
    NEXT_ORDER_PRODUCT,
    PREVIOUS_ORDER_PRODUCT,
    ORDER_DETAILS_UPDATE_PRODUCT_STATUS,
} from '../actions/types';

const INITIAL_STATE = {
    pagination: {
        current_page: null,
        next_page_url: null,
        prev_page_url: null,
        last_page: null
    },
    orders: [],
    selected_order: {},
    product_index: 0
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
        
        case NEXT_ORDER_PRODUCT: {
            let newIndex = state.product_index + 1
            if(newIndex >= state.selected_order.order_details.length)
                newIndex = 0;
            return {
                ...state,
                product_index: newIndex
            }
        }
            
        case PREVIOUS_ORDER_PRODUCT: {
            let newIndex = state.product_index - 1
            if(newIndex < 0)
                newIndex = 0;
            return {
                ...state,
                product_index: newIndex
            }
        }

        case ORDER_DETAILS_UPDATE_PRODUCT_STATUS:
        case ADD_ORDER:
        case ADD_ORDER_DETAIL:
        case ASSIGN_USER_ORDER:
        default: 
            return state;
    }
}