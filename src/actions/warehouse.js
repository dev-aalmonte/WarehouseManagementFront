import axios from 'axios';
import qs from 'querystring';
import { API_URL } from '../config';
import {
    GET_WAREHOUSES,
    SELECT_SINGLE_WAREHOUSE,
    ADD_WAREHOUSES,
    EDIT_WAREHOUSES,
    DELETE_WAREHOUSES,
    DISPLAY_WAREHOUSE
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

export function selectSingleWarehouse(id) {
    return function (dispatch){
        dispatch({
            type: SELECT_SINGLE_WAREHOUSE,
            payload: id
        });
    }
}

export function selectSingleWarehouseFromDB(id) {
    return function (dispatch) {
        axios.get(`${API_URL}/warehouses/${id}`)
            .then(response => {
                dispatch({
                    type: DISPLAY_WAREHOUSE,
                    payload: response.data
                })
            })
            .catch(err => {
                if(err)
                    console.log(err);
            })
    }
}

export function addWarehouse(fields, success) {
    if(!fields.id) {
        return function (dispatch) {
            axios.post(`${API_URL}/warehouses`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: ADD_WAREHOUSES,
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
            axios.put(`${API_URL}/warehouses/${fields.id}`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: EDIT_WAREHOUSES,
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

export function deleteWarehouse(id, success) {
    return function (dispatch) {
        axios.delete(`${API_URL}/warehouses/${id}`, requestConfig)
            .then(response => {
                if(response.data == 1) {
                    dispatch({
                        type: DELETE_WAREHOUSES,
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