import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import {deleteEducation} from '../../actions/profile';

const Educations = ({educ, deleteEducation}) => {
    const educs = educ.map((edu) => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
            </td>
            <td>
                <button
                onClick={() => deleteEducation(edu._id)}
                className="btn btn-danger"
                >
                Delete
                </button>
            </td>
        </tr>
      ));
    return ( 
        <>
            <h2 className="my-2">Educations</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>School</th>
                    <th className="hide-sm">Degree</th>
                    <th className="hide-sm">Years</th>
                    <th />
                </tr>
                </thead>
                <tbody>{educs}</tbody>
            </table>
        </>
     );
}

Educations.propTypes = {
    educ: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}
export default connect(null, {deleteEducation})(Educations);