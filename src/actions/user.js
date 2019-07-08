import axios from 'axios';
import qs from 'querystring';
import { API_URL } from '../config';
import {
    GET_USERS,
    SELECT_SINGLE_USER,
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
    DISPLAY_USER
} from './types';

const requestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export function getUsers(paginationURL = null, search = '') {
    const requestURL = paginationURL ? paginationURL : `${API_URL}/users`;
    const searchURL = paginationURL ? `&search=${search}` : `?search=${search}`;
    return function (dispatch) {
        axios.get(requestURL + searchURL)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_USERS,
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

export function selectSingleUser(id) {
    return function (dispatch){
        dispatch({
            type: SELECT_SINGLE_USER,
            payload: id
        });
    }
}

export function selectSingleUserFromDB(id) {
    return function (dispatch) {
        axios.get(`${API_URL}/users/${id}`)
            .then(response => {
                dispatch({
                    type: DISPLAY_USER,
                    payload: response.data
                })
            })
            .catch(err => {
                if(err)
                    console.log(err);
            })
    }
}

export function addUser(fields, success) {
    if(!fields.id) {
        return function (dispatch) {
            axios.post(`${API_URL}/users`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: ADD_USER,
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
            axios.put(`${API_URL}/users/${fields.id}`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: EDIT_USER,
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

export function deleteUser(id, success) {
    return function (dispatch) {
        axios.delete(`${API_URL}/users/${id}`, requestConfig)
            .then(response => {
                if(response.data == 1) {
                    dispatch({
                        type: DELETE_USER,
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