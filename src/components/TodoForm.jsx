import React, { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';

function TodoForm() {
  const { todos, setTodos, todoID, setTodoID } = useContext(TodosContext);
  const [todoInput, setTodoInput] = useState('');

  /**
   * Set todo input from the form input text field.
   * @param {SyntheticBaseEvent} event 
   */
  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  /**
   * Add todo to the list.
   * @param {SyntheticBaseEvent} event 
   */
  function addTodo(event) {
    event.preventDefault();
    if (todoInput.trim().length === 0) return;

    setTodos([...todos, {
      id: todoID,
      title: todoInput,
      isCompleted: false
    }]);

    setTodoID(prevID => prevID + 1);
    setTodoInput('');
  }

	return (
		<form action="#" onSubmit={addTodo}>
      <input
        type="text"
        value={todoInput}
        onChange={handleInput}
        className="todo-input"
        placeholder="What do you need to do?"
      />
    </form>
	)
}

export default TodoForm;