import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Register = () => {
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
            console.log('Password do not match')
        } else {
            console.log(formData);
            
            const newUser = {
                name,
                email, 
                password,
            }
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const body = JSON.stringify(newUser);
                const res = await axios.post('/api/users', body, config);
                console.log(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }
       
    }

    return ( <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={(e) => submitForm(e)}>
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
 
export default Register;