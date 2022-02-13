import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Loader from '../layout/loader/Loader';
import {Link} from 'react-router-dom';
import DashboardAction from './DashboardAction';
const Dashboard = ({getCurrentProfile, auth: {user}, profile : {profile, loading}}) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])

    return loading && profile === null ? <Loader /> : <section className='container'>
        <h1 className='large text-primary'>
            Dashboard
        </h1>
        <p className="lead">
            Welcome {user && user.name}
        </p>
        {profile !== null ? <DashboardAction /> : <p>Don't have yet a profile! <Link to="/create-profile">Create a profile</Link></p>}
    </section>;
}
 
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);