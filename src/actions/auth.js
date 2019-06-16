import axios from 'axios';
import qs from 'querystring';
import { API_URL } from '../config';
import {
    AUTHENTICATE_USER
} from './types';

export function login(fields, sucess) {
    return function (dispatch) {
        axios.post(`${API_URL}/login`, qs.stringify(fields), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                console.log("Response Data:", response.data);
                const { api_token } = response.data;
                localStorage.setItem('token', api_token);
                dispatch({
                    type: AUTHENTICATE_USER,
                    payload: response.data
                })
                sucess();
            })
            .catch(err => {
                if(err)
                    console.log(err);
            });
    }
}