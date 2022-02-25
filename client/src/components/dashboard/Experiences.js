import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import {deleteExperience} from '../../actions/profile';
const Experiences = ({exp, deleteExperience}) => {
    const exps = exp.map((xp) => (
        <tr key={xp._id}>
          <td>{xp.company}</td>
          <td className="hide-sm">{xp.title}</td>
          <td>
            {formatDate(xp.from)} - {xp.to ? formatDate(xp.to) : 'Now'}
          </td>
          <td>
            <button
              onClick={() => deleteExperience(xp._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    return ( 
        <>
            <h2 className="my-2">Experiences</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th className="hide-sm">Years</th>
                    <th />
                </tr>
                </thead>
                <tbody>{exps}</tbody>
            </table>
        </>
     );
}

Experiences.propTypes = {
    exp: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}
export default connect(null, {deleteExperience})(Experiences);