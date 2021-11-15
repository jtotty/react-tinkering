import { useState } from 'react';
import '../reset.css';
import '../App.css';

export default function App() {
  /**
   * Initial todos state.
   */
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Squat 150kg',
      isCompleted: true,
      isEditing: false
    },
    {
      id: 2,
      title: 'Bench Press 120kg',
      isCompleted: false,
      isEditing: false
    },
    {
      id: 3,
      title: 'Deadlift 200kg',
      isCompleted: false,
      isEditing: false
    }
  ]);

  // Todo text field state and todo ID state
  const [todoInput, setTodoInput] = useState('');
  const [todoID, setTodoID] = useState(() => {
    return todos.length ? todos[todos.length - 1].id + 1 : 1;
  });

  /**
   * Add a todo to the list.
   * @param {*} event 
   * @returns 
   */
  function addTodo(event) {
    event.preventDefault();
    if (todoInput.trim().length === 0) return;

    const todo = {
      id: todoID,
      title: todoInput,
      isCompleted: false
    };

    setTodos([...todos, todo]);
    setTodoInput('');
    setTodoID(prevID => prevID + 1);
  }

  /**
   * Set todo input from the form input text field.
   * @param {*} event 
   */
  function handleInput(event) {
    setTodoInput(event.target.value);
  }

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

  /**
   * Template
   */
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            value={todoInput}
            onChange={handleInput}
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

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

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}