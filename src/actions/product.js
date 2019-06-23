import axios from 'axios';
import qs from 'querystring';
import { API_URL } from '../config';
import {
    GET_PRODUCTS,
    ADD_PRODUCTS
} from './types';

const requestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export function getProducts(paginationURL = null, search = '') {
    const requestURL = paginationURL ? paginationURL : `${API_URL}/products`;
    const searchURL = paginationURL ? `&search=${search}` : `?search=${search}`;
    return function (dispatch) {
        axios.get(requestURL + searchURL)
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

export function addProduct(fields, success) {
    return function (dispatch) {
        axios.post(`${API_URL}/products`, qs.stringify(fields), requestConfig)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: ADD_PRODUCTS,
                        payload: response.data
                    });
                }
                success();
            })
            .catch(err => {
                if(err)
                    console.log(err);
            });
    }
}