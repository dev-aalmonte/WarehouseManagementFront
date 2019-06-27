import axios from 'axios';
import qs from 'querystring';
import { API_URL } from '../config';
import {
    GET_PRODUCTS,
    ADD_PRODUCTS,
    EDIT_PRODUCTS,
    SELECT_SINGLE_PRODUCT
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

export function selectSingleProduct(id) {
    return function (dispatch){
        dispatch({
            type: SELECT_SINGLE_PRODUCT,
            payload: id
        });
    }
}

export function addProduct(fields, success) {
    if(!fields.id) {
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
    else {
        return function (dispatch) {
            axios.put(`${API_URL}/products/${fields.id}`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: EDIT_PRODUCTS,
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
}