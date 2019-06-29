import axios from 'axios';
import qs from 'querystring';
import { API_URL } from '../config';
import {
    GET_WAREHOUSES
} from './types';

const requestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export function getWarehouses(paginationURL = null, search = '') {
    const requestURL = paginationURL ? paginationURL : `${API_URL}/warehouses`;
    const searchURL = paginationURL ? `&search=${search}` : `?search=${search}`;
    return function (dispatch) {
        axios.get(requestURL + searchURL)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_WAREHOUSES,
                        payload: response.data
                    });
                }
            })
            .catch(err => {
                if(err)
                    console.log(err);
            });
    }
}