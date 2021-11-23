import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TodoForm({ addTodo }) {
  const [todoInput, setTodoInput] = useState('');

  /**
   * Set todo input from the form input text field.
   * @param {*} event 
   */
  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  /**
   * Add todo to the list.
   * @param {*} event 
   */
  function handleSubmit(event) {
    event.preventDefault();
    if (todoInput.trim().length === 0) return;

    addTodo(todoInput);
    setTodoInput('');
  }

	return (
		<form action="#" onSubmit={handleSubmit}>
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

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default TodoForm;