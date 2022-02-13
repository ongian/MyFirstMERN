import React from 'react';
import PropTypes from 'prop-types';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux'


//...rest means to display all data being pass in array/object
const PrivateRoute = ({children, auth: {isAuthenticated, loading}}) => {
    return !isAuthenticated && !loading ? (<Navigate to="/login" />) : children
}
 
PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(PrivateRoute);