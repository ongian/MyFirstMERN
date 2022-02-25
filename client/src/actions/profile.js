import api from "../utils/api";
import { setAlert } from "./alert";
import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, DELETE_ACCOUNT, GET_ALL_PROFILES, GET_REPOS } from "./types";

//GET CURRENT PROFILE
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await api.get('/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//GET ALL PROFILES
export const getAllProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE})
    try {
        const res = await api.get('/profile');
        dispatch({
            type: GET_ALL_PROFILES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//GET PROFILE BY USER ID
export const getUserProfile = (userID) => async dispatch => {
    try {
        const res = await api.get(`/profile/user/${userID}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//GET GITHUB REPO
export const getGithubRepo = (userName) => async dispatch => {
    try {
        const res = await api.get(`/profile/github/${userName}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//Create or update profile
export const createProfile = (formData, navigate, edit = false) => async dispatch => {
    try {

        const res = await api.post('/profile', formData);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Profile Updated!' : 'Profile Created'), 'success');
        if(!edit){
            navigate('/dashboard')
        }
    } catch (error) {
        const err = error.response.data.errors;
        if(err){
            err.forEach((er) => dispatch(setAlert(er.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//ADD EXPERIENCE
export const addExp = (formData, navigate) => async dispatch => {
    try {

        const res = await api.put('/profile/experience', formData);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience Added'), 'success');
        navigate('/dashboard')

    } catch (error) {
        const err = error.response.data.errors;
        if(err){
            err.forEach((er) => dispatch(setAlert(er.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}


//ADD EDUCATION
export const addEduc = (formData, navigate) => async dispatch => {
    try {

        const res = await api.put('/profile/education', formData);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education Added'), 'success');
        navigate('/dashboard')

    } catch (error) {
        const err = error.response.data.errors;
        if(err){
            err.forEach((er) => dispatch(setAlert(er.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//Delete Experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience removed!'), 'danger');
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//Delete Education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education removed!'), 'danger');
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//Delete Account
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This can not be undone!')){
        try {
            await api.delete('/profile');
            dispatch({type: CLEAR_PROFILE})
            dispatch({type: DELETE_ACCOUNT})
            dispatch(setAlert('Account Deleted!'), 'danger');
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}