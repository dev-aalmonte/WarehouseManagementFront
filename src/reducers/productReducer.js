import {
    GET_PRODUCTS,
    SELECT_SINGLE_PRODUCT,
    SELECT_SINGLE_PRODUCT_FROM_DB,
    ADD_PRODUCTS,
    EDIT_PRODUCTS,
    DELETE_PRODUCTS,
    UPLOAD_PRODUCT_IMAGES,
    REMOVE_PRODUCT_IMAGES
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

        case SELECT_SINGLE_PRODUCT:
            const id = action.payload;
            return {
                ...state,
                selected_product: id == -1 ? {} : state.products[id]
            }

        case SELECT_SINGLE_PRODUCT_FROM_DB:
            const selected_product = action.payload;
            return {
                ...state,
                selected_product
            }

        case REMOVE_PRODUCT_IMAGES:
        case UPLOAD_PRODUCT_IMAGES:
        case ADD_PRODUCTS:
        case EDIT_PRODUCTS:
        case DELETE_PRODUCTS:
        default: 
            return state;
    }
}