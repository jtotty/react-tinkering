import React from 'react';
import PropTypes from 'prop-types';

function TodosList({ todos, completeTodo, isEditing, updateTodo, removeTodo }) {
	return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <li key={todo.id} className="todo-item-container">
          <div className="todo-item">
            <input type="checkbox" onChange={() => completeTodo(todo.id)} checked={todo.isCompleted} />
            { !todo.isEditing ? (
              <span
                onDoubleClick={() => isEditing(todo.id)}
                className={`todo-item-label ${todo.isCompleted ? 'line-through' : ''}`}
              >
                {todo.title}
              </span>
            ) : ( 
              <input
                type="text"
                onBlur={event => updateTodo(event, todo.id)}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    updateTodo(event, todo.id);
                  } else if (event.key === 'Escape') {
                    isEditing(todo.id);
                  }
                }}
                className="todo-item-input"
                defaultValue={todo.title}
                autoFocus
              />
            )}
          </div>
          <button className="x-button" onClick={() => removeTodo(todo.id)}>
            <svg
              className="x-button-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </li>
        ))} 
    </ul>
	)
}

TodosList.propTypes = {
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired,
  isEditing: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
}

export default TodosList;