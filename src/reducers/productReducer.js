import {
    GET_PRODUCTS
} from '../actions/types';

const INITIAL_STATE = {
    pagination: {
        current_page: null,
        next_page_url: null,
        prev_page_url: null,
        last_page: null
    },
    products: [],
    selected_product: {}
}

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case GET_PRODUCTS:
            const { next_page_url, prev_page_url, current_page, last_page, data } = action.payload;
            return {
                ...state,
                products: data,
                pagination: {
                    current_page,
                    next_page_url,
                    prev_page_url,
                    last_page
                }
            }

        default: 
            return state;
    }
}