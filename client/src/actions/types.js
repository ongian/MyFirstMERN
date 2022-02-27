//The reason that action types are separated in other file and imported to reducers
//is when there are changes to action types name, it will be easy to change and won't
//need to go to each reducers where action types was set.
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const GET_PROFILE = 'GET_PROFILE';
export const GET_ALL_PROFILES = 'GET_ALL_PROFILES';
export const PROFILE_ERROR = 'PROFILE_ERROR';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const GET_REPOS = 'GET_REPOS';
export const NO_REPOS = 'NO_REPOS';
export const POST = 'POST';
export const GET_POST = 'GET_POST';
export const GET_POSTS = 'GET_POST';
export const POST_ERROR = 'POST_ERROR';
export const UPDATE_LIKES = 'UPDATE_LIKES';
export const DELETE_POST = 'DELETE_POST';
export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';