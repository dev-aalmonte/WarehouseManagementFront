import {
    GET_PRODUCTS
} from '../actions/types';

const INITIAL_STATE = {
    products: [],
    selected_product: {}
}

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case GET_PRODUCTS:
            const products = action.payload;
                return {
                    ...state,
                    products
                }

        default: 
            return state;
    }
}