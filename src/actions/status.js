import axios from 'axios';
import qs from 'querystring';
import { API_URL } from '../config';

import {
    GET_STATUS,
    SELECT_SINGLE_STATUS,
    ADD_STATUS,
    EDIT_STATUS,
    DELETE_STATUS,
    DISPLAY_STATUS
} from './types';

const requestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export function getStatus(paginationURL = null, search = '') {
    const requestURL = paginationURL ? paginationURL : `${API_URL}/status`;
    const searchURL = paginationURL ? `&search=${search}` : `?search=${search}`;
    return function (dispatch) {
        axios.get(requestURL + searchURL)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_STATUS,
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

export function getStatusByProperty(property = '') {
    return function (dispatch) {
        axios.get(`${API_URL}/status?property=${property}`)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_STATUS,
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

export function selectSingleStatus(id) {
    return function (dispatch){
        dispatch({
            type: SELECT_SINGLE_STATUS,
            payload: id
        });
    }
}

export function selectSingleStatusFromDB(id) {
    return function (dispatch) {
        axios.get(`${API_URL}/status/${id}`)
            .then(response => {
                dispatch({
                    type: DISPLAY_STATUS,
                    payload: response.data
                })
            })
            .catch(err => {
                if(err)
                    console.log(err);
            })
    }
}

export function addStatus(fields, success) {
    if(!fields.id) {
        return function (dispatch) {
            axios.post(`${API_URL}/status`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: ADD_STATUS,
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
            axios.put(`${API_URL}/status/${fields.id}`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: EDIT_STATUS,
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

export function deleteStatus(id, success) {
    return function (dispatch) {
        axios.delete(`${API_URL}/status/${id}`, requestConfig)
            .then(response => {
                if(response.data == 1) {
                    dispatch({
                        type: DELETE_STATUS,
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