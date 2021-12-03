import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

function TodoCompleteAll() {
  const { todos, setTodos } = useContext(TodosContext);

  function completeAll() {
    setTodos(todos.map(todo => {
      todo.isCompleted = true;

      return todo;
    }));
  }

	return (
		<div>
			<div className="button" onClick={completeAll}>
				Check All
			</div>
		</div>
	);
}

export default TodoCompleteAll;