import api from "../utils/api";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "./types";

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