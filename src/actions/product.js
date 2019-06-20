import axios from 'axios';
import qs from 'querystring';
import { API_URL } from '../config';
import {
    GET_PRODUCTS
} from './types';

const requestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export function getProducts(paginationURL = null) {
    const requestURL = paginationURL ? paginationURL : `${API_URL}/products`;
    return function (dispatch) {
        axios.get(requestURL)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_PRODUCTS,
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