import { useState } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodosList from './TodosList';
import '../css/reset.css';
import '../css/App.css';

function App() {
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
  const [todoID, setTodoID] = useState(() => {
    return todos.length ? todos[todos.length - 1].id + 1 : 1;
  });

  /**
   * Add a todo to the list.
   * @param {string} todo Title of the todo. 
   * @returns 
   */
  function addTodo(todo) {
    setTodos([...todos, {
      id: todoID,
      title: todo,
      isCompleted: false
    }]);

    setTodoID(prevID => prevID + 1);
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
        <TodoForm addTodo={addTodo} />

        { todos.length > 0 ? (
          <TodosList 
            todos={todos}
            completeTodo={completeTodo}
            isEditing={isEditing}
            updateTodo={updateTodo}
            removeTodo={removeTodo}
          />
          ) : (
          <NoTodos /> 
          )
        }

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

export default App;