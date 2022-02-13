import { 
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    AUTH_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true
}

function auth(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_ERROR:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        default: 
        return state;
    }
}

export default auth;