import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    
    const {email, password} = formData;
    
    const onChangeInput = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }

    const submitForm = async(e) => {
        e.preventDefault();
        
        login(email, password);
        // console.log(formData);
        // const newUser = {
        //     email, 
        //     password,
        // }
        // try {
        //     const config = {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     };
        //     const body = JSON.stringify(newUser);
        //     const res = await axios.post('/api/auth', body, config);
        //     console.log(res.data)
        // } catch (error) {
        //     console.log(error.message)
        // }
       
    }

    //redirect on authSuccess
    if(isAuthenticated){
        return <Navigate to="/dashboard" />;
    }
    return ( <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> SignIn To Your Account</p>
        <form className="form" onSubmit={(e) => submitForm(e)}>
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
            <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
            Register Now? <Link to="/register">Register</Link>
        </p>
    </section> );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
 
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);