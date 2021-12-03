import { useContext } from 'react';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCompleteAll from './TodoCompleteAll';
import TodoFilters from './TodoFilters';
import useToggle from '../hooks/useToggle';
import { TodosContext } from '../context/TodosContext';

function TodosList() {
  const { todos, setTodos, todosFiltered } = useContext(TodosContext);

  const [isFeaturesOneVisible, setFeaturesOneVisible] = useToggle();
  const [isFeaturesTwoVisible, setFeaturesTwoVisible] = useToggle(false);

  /**
   * Remove todo from list.
   * @param {number} id - The id of the todo to remove.
   */
    function removeTodo(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  /**
   * Toggle todo completion.
   * @param {number} id - The id of the todo to toggle.
   */
  function completeTodo(id) {
    setTodos([...todos].map(todo => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }

      return todo;
    }));
  }

  /**
   * Toggle edit a todo state.
   * @param {number} id - The id of the todo to edit.
   */
  function isEditing(id) {
    setTodos([...todos].map(todo => {
      if (todo.id === id) {
        todo.isEditing = !todo.isEditing;
      }

      return todo;
    }));
  }

  /**
   * Update a todo title.
   */
  function updateTodo(event, id) {
    if (event.target.value.trim().length === 0) return;
  
    setTodos([...todos].map(todo => {
      if (todo.id === id) {
        todo.title = event.target.value;;
        todo.isEditing = false;
      }

      return todo;
    }));
  }

	return (
    <>
      <ul className="todo-list">
        {todosFiltered().map((todo) => (
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
      
      <div className="toggles-container">
        <button className="button" onClick={setFeaturesOneVisible}>
          Features One Toggle
        </button>
  
        <button className="button" onClick={setFeaturesTwoVisible}>
          Features Two Toggle
        </button>
      </div>

      { isFeaturesOneVisible && 
        <div className="check-all-container">
          <TodoCompleteAll />
          <TodoItemsRemaining />
        </div>
      }

      { isFeaturesTwoVisible &&
        <div className="other-buttons-container">
          <TodoFilters />
          <TodoClearCompleted />
        </div>
      }
    </>
	);
}

export default TodosList;