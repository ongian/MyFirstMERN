import {v4 as uuidV4} from 'uuid';
import {REMOVE_ALERT, SET_ALERT} from './types'

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
    const id = uuidV4();
    dispatch({
        type: SET_ALERT,
        payload: {
            msg,
            alertType,
            id
        }
    })
    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), timeout)
}