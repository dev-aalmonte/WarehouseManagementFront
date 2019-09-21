import {
    GET_WAREHOUSES,
    SELECT_SINGLE_WAREHOUSE,
    ADD_WAREHOUSES,
    EDIT_WAREHOUSES,
    DELETE_WAREHOUSES,
    DISPLAY_WAREHOUSE,

    // Stock
    GET_WAREHOUSE_STOCK,
    SELECT_SINGLE_WAREHOUSE_STOCK,
    ADD_WAREHOUSE_STOCK,
    EDIT_WAREHOUSE_STOCK,
    DELETE_WAREHOUSE_STOCK,

    // Location
    GET_WAREHOUSE_LOCATIONS,
    ADD_WAREHOUSE_LOCATION
} from '../actions/types';

const INITIAL_STATE = {
    pagination: {
        current_page: null,
        next_page_url: null,
        prev_page_url: null,
        last_page: null
    },
    warehouses: [],
    selected_warehouse: {},
    stocks: [],
    selected_stock: {},
    locations: [],
    selected_location: {},
    pagination_location: {
        current_page: null,
        next_page_url: null,
        prev_page_url: null,
        last_page: null,
    }
}

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case GET_WAREHOUSES: {
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
        }

        case SELECT_SINGLE_WAREHOUSE:
            const id = action.payload;
            return {
                ...state,
                selected_warehouse: id == -1 ? {} : state.warehouses[id]
            }
        
        case DISPLAY_WAREHOUSE:
            return {
                ...state,
                selected_warehouse: action.payload
            }

        // Stock
        case GET_WAREHOUSE_STOCK: {
            const { next_page_url, prev_page_url, current_page, last_page, data } = action.payload;
            return {
                ...state,
                pagination: {
                    current_page,
                    next_page_url,
                    prev_page_url,
                    last_page
                },
                stocks: data
            }
        }

        case SELECT_SINGLE_WAREHOUSE_STOCK:
            return {
                ...state,
                selected_stock: action.payload == -1 ? {} : state.stocks[action.payload]
            }
        
        // Locations
        case GET_WAREHOUSE_LOCATIONS: {
            const { next_page_url, prev_page_url, current_page, last_page, data } = action.payload;
            return {
                ...state,
                pagination_location: {
                    current_page,
                    next_page_url,
                    prev_page_url,
                    last_page
                },
                locations: data
            }
        }
        
        case ADD_WAREHOUSE_LOCATION:
        case ADD_WAREHOUSE_STOCK:
        case EDIT_WAREHOUSE_STOCK:            
        case DELETE_WAREHOUSE_STOCK:
        case ADD_WAREHOUSES:
        case EDIT_WAREHOUSES:
        case DELETE_WAREHOUSES:
        default: 
            return state;
    }
}