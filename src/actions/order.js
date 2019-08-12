import axios from 'axios';
import qs from 'querystring';
import { API_URL } from '../config';
import {
    ADD_ORDER,
    ADD_ORDER_DETAIL
} from './types';

const requestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export function addOrder(fields, success) {
    if(!fields.id) {
        return function (dispatch) {
            axios.post(`${API_URL}/orders`, qs.stringify(fields), requestConfig)
                .then(response => {
                    if(response.data){
                        dispatch({
                            type: ADD_ORDER,
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

export function addOrderDetail(fields, success) {
    return function (dispatch) {
        axios.post(`${API_URL}/orderdetail`, qs.stringify(fields), requestConfig)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: ADD_ORDER_DETAIL,
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