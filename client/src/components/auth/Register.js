import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import {register} from '../../actions/auth';

import propTypes from 'prop-types';
const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    
    const {name, email, password, confirmPassword} = formData;
    
    const onChangeInput = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }

    const submitForm = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setAlert('Password do not match', 'danger', 25000)
        } else {
            register({name, email, password});
        }  
    }

    if(isAuthenticated) {
        return <Navigate to="/dashboard" />
    }
    return ( <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={submitForm}>
            <div className="form-group">
                <input onChange={e => onChangeInput(e)} value={name} type="text" placeholder="Name" name="name" required />
            </div>
            <div className="form-group">
                <input onChange={e => onChangeInput(e)} value={email} type="email" placeholder="Email Address" name="email" required />
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
            </div>
            <div className="form-group">
            <input
                onChange={e => onChangeInput(e)}
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={password}
            />
            </div>
            <div className="form-group">
            <input
                onChange={e => onChangeInput(e)}
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                minLength="6"
                value={confirmPassword}
            />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
        </p>
    </section> );
}
Register.propTypes = {
    setAlert: propTypes.func.isRequired,
    register: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);