import {
    GET_SECTION,
    GET_AISLE,
    GET_COLUMN,
    GET_ROW
} from '../actions/types';

const INITIAL_STATE = {
    sections: [],
    selected_section: {},

    aisles: [],
    selected_aisle: {},

    columns: [],
    selected_column: {},

    rows: [],
    selected_row: {}
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
        
        // case SELECT_SINGLE_STATUS:
        //     const id = action.payload;
        //     return {
        //         ...state,
        //         selected_status: id == -1 ? {} : state.status[id]
        //     }
        
        default: 
            return state;
    }
}