import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllProfiles } from '../../actions/profile';
import Loader from '../layout/loader/Loader';
import ProfileItems from './ProfileItems';
const Profiles = ({profile : {profiles, loading}, getAllProfiles}) => {
    useEffect(() => {
        getAllProfiles()
    }, [getAllProfiles])
    return (
        <section className="container">
            {loading ? (
                <Loader />
            ) : (
                <>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop" /> Browse and connect with
                    developers
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (
                    profiles.map((profile) => (
                        <ProfileItems key={profile._id} profile={profile} />
                    ))
                    ) : (
                    <h4>No profiles found...</h4>
                    )}
                </div>
                </>
            )}
            </section>
    );
}
 
Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getAllProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, {getAllProfiles})(Profiles);