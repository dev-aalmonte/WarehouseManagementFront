import axios from 'axios';
import qs from 'querystring';
import { API_URL } from '../config';
import {
    AUTHENTICATE_USER
} from './types';

export function login(fields, success) {
    return function (dispatch) {
        axios.post(`${API_URL}/login`, qs.stringify(fields), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                const { api_token } = response.data;
                localStorage.setItem('token', api_token);
                dispatch({
                    type: AUTHENTICATE_USER,
                    payload: response.data
                })
                success();
            })
            .catch(err => {
                if(err)
                    console.log(err);
            });
    }
}

export function getUserByToken(token, success) {
    return function (dispatch) {
        axios.get(`${API_URL}/user/token/${token}`)
            .then(response => {
                dispatch({
                    type: AUTHENTICATE_USER,
                    payload: response.data
                });
                success(response.data);
            })
            .catch(err => {
                if(err)
                    console.log(err);
            });
    }
}