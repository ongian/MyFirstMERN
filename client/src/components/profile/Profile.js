import React, { useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import { getUserProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import Loader from '../layout/loader/Loader';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExp from './ProfileExp';
import ProfileGithub from './ProfileGithub';
import ProfileEduc from './ProfileEduc';
const Profile = ({profile : {profile, loading}, auth, getUserProfile}) => {
    const {id} = useParams()
    useEffect(() => {
        getUserProfile(id)
    }, [getUserProfile, id])
    return ( <section className="container">
    {profile === null ? (
      <Loader />
    ) : (
      <Fragment>
        <Link to="/profiles" className="btn btn-light">
          Back To Profiles
        </Link>
        {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === profile.user._id && (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          )}
        <div className="profile-grid my-1">
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />
          <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {profile.experience.length > 0 ? (
              <Fragment>
                {profile.experience.map((experience) => (
                  <ProfileExp
                    key={experience._id}
                    experience={experience}
                  />
                ))}
              </Fragment>
            ) : (
              <h4>No experience credentials</h4>
            )}
          </div>

          <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {profile.education.length > 0 ? (
              <Fragment>
                {profile.education.map((education) => (
                  <ProfileEduc
                    key={education._id}
                    education={education}
                  />
                ))}
              </Fragment>
            ) : (
              <h4>No education credentials</h4>
            )}
          </div>

          {profile.githubusername && (
            <ProfileGithub username={profile.githubusername} />
          )}
        </div>
      </Fragment>
    )}
  </section> );
}

Profile.propTypes = {
    profile: propTypes.object.isRequired,
    auth: propTypes.object.isRequired,
    getUserProfile: propTypes.func.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, {getUserProfile})(Profile);