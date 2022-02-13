import api from '../utils/api';
import { setAlert } from './alert';

import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    AUTH_ERROR, 
    AUTH_SUCCESS, 
    LOGIN_SUCCESS, 
    LOGIN_ERROR,
    LOGOUT} from '../actions/types';

//User authentication
export const authSucess = () => async dispatch => {
    try {
        const res = await api.get('/auth');
        dispatch({
            type: AUTH_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


//register user
export const register = (formData) => async dispatch => {
    try {
        const res = await api.post('/users', formData);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(authSucess());
    } catch (error) {
        const err = error.response.data.errors;
        if(err){
            err.forEach((er) => dispatch(setAlert(er.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
}


//Login user
export const login = (email, password) => async dispatch => {
    const body = {
        email, password
    };

    try {
        const res = await api.post('/auth', body);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(authSucess());
        
    } catch (error) {
        const err = error.response.data.errors;
        if(err){
            err.forEach((er) => dispatch(setAlert(er.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_ERROR
        });
    }
}

//Logout

export const logout = () => ({ type: LOGOUT });