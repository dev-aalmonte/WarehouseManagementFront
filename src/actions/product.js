import axios from 'axios';
import qs from 'querystring';
import { API_URL } from '../config';
import {
    GET_PRODUCTS,
    ADD_PRODUCTS,
    EDIT_PRODUCTS,
    DELETE_PRODUCTS,
    SELECT_SINGLE_PRODUCT,
    UPLOAD_PRODUCT_IMAGES
} from './types';

const requestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

const fileRequestConfig = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}

export function getProducts(paginationURL = null, search = '', itemsPerPage = 15) {
    let requestURL = paginationURL ? paginationURL : `${API_URL}/products`;

    const searchURL = (requestURL.indexOf("?") !== -1) ? `&search=${search}` : `?search=${search}`;
    requestURL += searchURL;

    const itemPerPageURL = (requestURL.indexOf("?") !== -1) ? `&item_number=${itemsPerPage}` : `?item_number=${itemsPerPage}`;
    requestURL += itemPerPageURL;

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

export function selectSingleProduct(id) {
    return function (dispatch){
        dispatch({
            type: SELECT_SINGLE_PRODUCT,
            payload: id
        });
    }
}

export function addProduct(fields, success, error) {
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
                    success(response);
                })
                .catch(err => {
                    if(err){
                        console.log(err);
                        // error(err.response.data.error)
                    }
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

export function uploadProductImage(fields, success, error) {
    if(fields.id) {
        let data = new FormData();
        data.append('index', fields.index);
        data.append('image', fields.image, fields.image.name);
        return function (dispatch) {
            axios.post(`${API_URL}/upload/product/${fields.id}`, data, fileRequestConfig)
                .then(response => {
                    if(response.data) {
                        dispatch({
                            type: UPLOAD_PRODUCT_IMAGES,
                            payload: response.data
                        });
                        success(response.data);
                    }
                })
                .catch(err => {
                    if(err)
                        console.log(err);
                })
        }
    }
}

export function deleteProduct(id, success) {
    return function (dispatch) {
        axios.delete(`${API_URL}/products/${id}`, requestConfig)
            .then(response => {
                if(response.data == 1) {
                    dispatch({
                        type: DELETE_PRODUCTS,
                        payload: id
                    });
                }
                success();
            })
            .catch(err => {
                if(err)
                    console.log(err);
            })
    }
}