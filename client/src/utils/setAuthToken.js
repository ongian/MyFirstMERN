//set auth token headers on auth success and delete token on auth fail.
import axios from 'axios';

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken;
