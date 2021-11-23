import { useState } from 'react';
import PropTypes from 'prop-types';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCompleteAll from './TodoCompleteAll';
import TodoFilters from './TodoFilters';

TodosList.propTypes = {
  todos: PropTypes.array.isRequired,
	todosFiltered: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  isEditing: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  remaining: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  completeAll: PropTypes.func.isRequired
};

function TodosList({
  todos,
	todosFiltered,
  completeTodo,
  isEditing,
  updateTodo,
  removeTodo,
  remaining,
  clearCompleted,
  completeAll
}) {
	const [filter, setFilter] = useState('all');

	return (
    <>
      <ul className="todo-list">
        {todosFiltered(filter).map((todo, index) => (
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

      <div className="check-all-container">
        <TodoCompleteAll completeAll={completeAll} />
        <TodoItemsRemaining remaining={remaining} />
      </div>

      <div className="other-buttons-container">
				<TodoFilters 
					filter={filter}
					setFilter={setFilter}
				/>
        <TodoClearCompleted clearCompleted={clearCompleted} />
      </div>
    </>
	);
}

export default TodosList;