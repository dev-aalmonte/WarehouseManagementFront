import {
    GET_SECTION,
    GET_AISLE,
    GET_COLUMN,
    GET_ROW,
    ADD_ITEM_TO_LOCATION,
    GET_ITEMS
} from '../actions/types';

const INITIAL_STATE = {
    sections: [],
    selected_section: {},

    aisles: [],
    selected_aisle: {},

    columns: [],
    selected_column: {},

    rows: [],
    selected_row: {},

    products_on_location: []

}

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case GET_SECTION:
            const sections = action.payload;
            return {
                ...state,
                sections
            }
        
        case GET_AISLE:
            const aisles = action.payload;
            return {
                ...state,
                aisles
            }
        
        case GET_COLUMN:
            const columns = action.payload;
            return {
                ...state,
                columns
            }
        
        case GET_ROW:
            const rows = action.payload;
            return {
                ...state,
                rows
            }
        
        case GET_ITEMS:
            const products_on_location = action.payload;
            return {
                ...state,
                products_on_location
            }
            
        // case SELECT_SINGLE_STATUS:
        //     const id = action.payload;
        //     return {
        //         ...state,
        //         selected_status: id == -1 ? {} : state.status[id]
        //     }
        
        case ADD_ITEM_TO_LOCATION:
        default: 
            return state;
    }
}