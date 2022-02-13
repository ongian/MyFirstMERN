import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/Login';
import CreateProfile from './components/dashboard/profile-form/CreateProfile';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { authSucess } from './actions/auth';
import { LOGOUT } from './actions/types';
import EditProfile from './components/dashboard/profile-form/EditProfile';
import AddExp from './components/dashboard/profile-form/AddExp';
const App = () => {
  useEffect(() => {
    if(localStorage.token){
      setAuthToken(localStorage.token);
    }

    store.dispatch(authSucess());

    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        store.dispatch({ type: LOGOUT });
      }
    });

  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route path="/" element={ <Landing /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/dashboard" element={ <PrivateRoute><Dashboard /></PrivateRoute> } />
            <Route path="/create-profile" element={<PrivateRoute><CreateProfile /></PrivateRoute>} />
            <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
            <Route path="/add-experience" element={<PrivateRoute><AddExp /></PrivateRoute>} />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;
