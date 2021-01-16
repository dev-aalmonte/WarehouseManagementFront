import axios from 'axios';
import { reset } from 'redux-form';

import qs from 'querystring';
import { API_URL } from '../config';
import {
    GET_CLIENTS,
    SELECT_SINGLE_CLIENT,
    ADD_CLIENTS,
    EDIT_CLIENTS,
    DELETE_CLIENTS,
    DISPLAY_CLIENT,
    REMOVE_CLIENT_IMAGES,
    UPLOAD_CLIENT_IMAGES,
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

export function getClients(paginationURL = null, search = '') {
    const requestURL = paginationURL ? paginationURL : `${API_URL}/clients`;
    const searchURL = paginationURL ? `&search=${search}` : `?search=${search}`;
    return function (dispatch) {
        axios.get(requestURL + searchURL)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_CLIENTS,
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

export function selectSingleClient(id) {
    return function (dispatch){
        dispatch({
            type: SELECT_SINGLE_CLIENT,
            payload: id
        });
    }
}

export function selectSingleClientFromDB(id) {
    return function (dispatch) {
        axios.get(`${API_URL}/clients/${id}`)
            .then(response => {
                dispatch({
                    type: DISPLAY_CLIENT,
                    payload: response.data
                })
            })
            .catch(err => {
                if(err)
                    console.log(err);
            })
    }
}

export function addClient(fields, success) {
    if(!fields.id) {
        return function (dispatch) {
            axios.post(`${API_URL}/clients`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: ADD_CLIENTS,
                            payload: response.data
                        });
                    }
                    success(response);
                })
                .catch(err => {
                    if(err)
                        console.log(err);
                });
        }
    }
    else {
        return function (dispatch) {
            axios.put(`${API_URL}/clients/${fields.id}`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: EDIT_CLIENTS,
                            payload: response.data
                        });
                    }
                    success(response);
                })
                .catch(err => {
                    if(err)
                        console.log(err);
                });
        }
    }
}

export function uploadClientImage(fields, success, error) {
    if(fields.id) {
        let data = new FormData();
        data.append('index', fields.index);
        data.append('logo', fields.logo, fields.logo.name);
        data.append('background', fields.background, fields.background.name);
        return function (dispatch) {
            axios.post(`${API_URL}/upload/client/${fields.id}`, data, fileRequestConfig)
                .then(response => {
                    if(response.data) {
                        dispatch({
                            type: UPLOAD_CLIENT_IMAGES,
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

export function removeClientImage(id, success) {
    return function (dispatch) {
        axios.delete(`${API_URL}/images/client/${id}`, requestConfig)
            .then(response => {
                dispatch({
                    type: REMOVE_CLIENT_IMAGES,
                    payload: response.data
                });
                success(response.data.productID);
            })
    }
}

export function deleteClient(id, success) {
    return function (dispatch) {
        axios.delete(`${API_URL}/clients/${id}`, requestConfig)
            .then(response => {
                if(response.data == 1) {
                    dispatch({
                        type: DELETE_CLIENTS,
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