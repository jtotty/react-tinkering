import React, { useMemo, useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

function TodoItemsRemaining() {
  const { todos } = useContext(TodosContext);

  function remainingCalculation() {
		return todos.filter(todo => !todo.isCompleted).length;
  }

  const remaining = useMemo(remainingCalculation, [todos]);

	return (
		<span>{remaining} items remaining</span>
	)
}

export default TodoItemsRemaining;
