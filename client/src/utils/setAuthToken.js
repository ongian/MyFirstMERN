//set auth token headers on auth success and delete token on auth fail.
import api from './api';

const setAuthToken = (token) => {
  console.log('Token ',token)
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
