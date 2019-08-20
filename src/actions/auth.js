import axios from 'axios';
import qs from 'querystring';
import { API_URL } from '../config';
import {
    AUTHENTICATE_USER,
    LOGOUT_USER
} from './types';

const requestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export function login(fields, success) {
    return function (dispatch) {
        axios.post(`${API_URL}/login`, qs.stringify(fields), requestConfig)
            .then(response => {
                if(!response.data.error){
                    const { api_token } = response.data;
                    localStorage.setItem('token', api_token);
                    dispatch({
                        type: AUTHENTICATE_USER,
                        payload: response.data
                    })
                    success(response);
                }
                else {
                    console.log("Something is wrong");
                }
            })
            .catch(err => {
                if(err)
                    console.log(err);
            });
    }
}

export function logout(fields, success) {
    return function (dispatch) {
        axios.post(`${API_URL}/logout`, qs.stringify(fields), requestConfig)
            .then(response => {
                localStorage.setItem('token', 'null');
                dispatch({
                    type: LOGOUT_USER,
                    payload: {}
                });
                success();
            })
            .catch(err => {
                if(err)
                    console.log(err);
            })
    }
}

export function getUserByToken(token, success) {
    return function (dispatch) {
        axios.get(`${API_URL}/user/token/${token}`)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: AUTHENTICATE_USER,
                        payload: response.data
                    });
                }
                // else {
                //     dispatch({
                //         type: LOGOUT_USER,
                //         payload: response.data
                //     });

                // }
                success(response.data);
            })
            .catch(err => {
                if(err)
                    console.log(err);
            });
    }
}