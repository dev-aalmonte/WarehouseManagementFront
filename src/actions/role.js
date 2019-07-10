import axios from 'axios';
import qs from 'querystring';
import { API_URL } from '../config';
import {
    GET_ROLES,
    SELECT_SINGLE_ROLE,
    ADD_ROLE,
    EDIT_ROLE,
    DELETE_ROLE,
    DISPLAY_ROLE
} from './types';

const requestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export function getRoles(paginationURL = null, search = '') {
    const requestURL = paginationURL ? paginationURL : `${API_URL}/roles`;
    const searchURL = paginationURL ? `&search=${search}` : `?search=${search}`;
    return function (dispatch) {
        axios.get(requestURL + searchURL)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_ROLES,
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

export function selectSingleRole(id) {
    return function (dispatch){
        dispatch({
            type: SELECT_SINGLE_ROLE,
            payload: id
        });
    }
}

export function selectSingleRoleFromDB(id) {
    return function (dispatch) {
        axios.get(`${API_URL}/roles/${id}`)
            .then(response => {
                dispatch({
                    type: DISPLAY_ROLE,
                    payload: response.data
                })
            })
            .catch(err => {
                if(err)
                    console.log(err);
            })
    }
}

export function addRole(fields, success) {
    if(!fields.id) {
        return function (dispatch) {
            axios.post(`${API_URL}/roles`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: ADD_ROLE,
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
            axios.put(`${API_URL}/roles/${fields.id}`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: EDIT_ROLE,
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

export function deleteRole(id, success) {
    return function (dispatch) {
        axios.delete(`${API_URL}/roles/${id}`, requestConfig)
            .then(response => {
                if(response.data == 1) {
                    dispatch({
                        type: DELETE_ROLE,
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