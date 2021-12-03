import React, { useContext } from 'react'
import { TodosContext } from '../context/TodosContext';

function TodoClearCompleted() {
  const { todos, setTodos } = useContext(TodosContext);

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isCompleted));
  }

	return (
		<div>
			<button className="button" onClick={clearCompleted}>
				Clear completed
			</button>
		</div>
	);
}

export default TodoClearCompleted;