import { useState, useEffect } from 'react';

/**
 * Retrieve data from localStorage.
 * @param {string} key 
 * @param {string} initialValue 
 */
function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		const item = localStorage.getItem(key);

		return item ? JSON.parse(item) : initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;