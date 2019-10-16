import axios from 'axios';
import { reset } from 'redux-form';
import qs from 'querystring';
import { API_URL } from '../config';

import {
    GET_SECTION,
    GET_AISLE,
    GET_COLUMN,
    GET_ROW,
    ADD_ITEM_TO_LOCATION,
} from './types';

const requestConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export function getSectionByWarehouse(warehouseID) {
    const requestURL = `${API_URL}/location/section/${warehouseID}`;
    return function (dispatch) {
        axios.get(requestURL)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_SECTION,
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

export function getAisleBySection(sectionID) {
    const requestURL = `${API_URL}/location/aisle/${sectionID}`;
    return function (dispatch) {
        axios.get(requestURL)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_AISLE,
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

export function getColumnByAisle(aisleID) {
    const requestURL = `${API_URL}/location/column/${aisleID}`;
    return function (dispatch) {
        axios.get(requestURL)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_COLUMN,
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

export function getRowByColumn(columnID) {
    const requestURL = `${API_URL}/location/row/${columnID}`;
    return function (dispatch) {
        axios.get(requestURL)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: GET_ROW,
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

export function addItemToLocation(fields, success){
    return function (dispatch) {
        axios.post(`${API_URL}/location/item`, qs.stringify(fields), requestConfig)
            .then(response => {
                if(response.data){
                    dispatch({
                        type: ADD_ITEM_TO_LOCATION,
                        payload: response.data
                    });
                }
                success(response);
                dispatch(reset('location-item-add'));
            })
            .catch(err => {
                if(err)
                    console.log(err);
            });
    }
}