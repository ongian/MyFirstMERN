import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
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
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
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
export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({
        name, email, password
    });

    try {
        const res = await axios.post('api/users', body, config);

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
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({
        email, password
    });

    try {
        const res = await axios.post('api/auth', body, config);

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

export const logout = () => dispatch => {
    dispatch({type: LOGOUT})
} 