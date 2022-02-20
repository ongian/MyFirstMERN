import React from 'react';
import PropTypes from 'prop-types';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux'
import Loader from '../layout/loader/Loader';

const PrivateRoute = ({
    children,
    auth: { isAuthenticated, loading }
}) => {
    if (loading) return <Loader />;
    if (isAuthenticated) return children;

    return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);