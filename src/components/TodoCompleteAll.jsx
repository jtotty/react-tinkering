import React from 'react';
import PropTypes from 'prop-types';

TodoCompleteAll.propTypes = {
	completeAll: PropTypes.func.isRequired
};

function TodoCompleteAll({ completeAll }) {
	return (
		<div>
			<div className="button" onClick={completeAll}>
				Check All
			</div>
		</div>
	);
}

export default TodoCompleteAll;