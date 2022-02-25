import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Loader from '../layout/loader/Loader';
import {Link} from 'react-router-dom';
import DashboardAction from './DashboardAction';
import Experiences from './Experiences';
import Educations from './Educations';
const Dashboard = ({getCurrentProfile, deleteAccount, auth: {user}, profile : {profile, loading}}) => {
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
        {
            profile !== null ? (
                <>
                    <DashboardAction />
                    <Educations educ={profile.education} />
                    <Experiences exp={profile.experience} />
                    <div className="my-2">
                        <button className="btn btn-danger" onClick={() => deleteAccount()}>
                        <i className="fas fa-user-minus" /> Delete My Account
                        </button>
                    </div>
                </>) : 
                <p>Don't have yet a profile! <Link to="/create-profile">Create a profile</Link></p>
        }

    </section>;
}
 
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);