import React from 'react'
import PropTypes from 'prop-types';

TodoItemsRemaining.propTypes = {
	remaining: PropTypes.func.isRequired
};

function TodoItemsRemaining({ remaining }) {
	return (
		<span>{remaining()} items remaining</span>
	)
}

export default TodoItemsRemaining;
