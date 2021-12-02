import { useState } from 'react';

/**
 * Toggle boolean state.
 * @param {bool} initialState 
 * @returns {Array} [state, setState]
 */
function useToggle(initialState = true) {
	const [visible, setVisible] = useState(initialState);

	function toggle() {
		setVisible(prevVisible => !prevVisible);
	}

	return [visible, toggle];
}

export default useToggle;