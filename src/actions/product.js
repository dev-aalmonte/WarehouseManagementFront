import axios from 'axios';
import qs from 'querystring';
import { API_URL } from '../config';
import {
    GET_PRODUCTS
} from './types';

const requestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export function getProducts() {
    return function (dispatch) {
        axios.get(`${API_URL}/products`)
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