import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const Alert = ({alerts}) => (
    <div className='alert-wrapper'>
        {alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>
        ))}
    </div>
)

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    //state reducers that you want to bring up.
    //list of states are in your root reducer folder, the index,js
    //states here will be pass to current component as props
    alerts: state.alert
})
export default connect(mapStateToProps)(Alert);