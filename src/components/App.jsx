import { useRef, useEffect, useMemo } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodosList from './TodosList';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/reset.css';
import '../css/App.css';

function App() {
  const [name, setName] = useLocalStorage('name', '');
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [todoID, setTodoID] = useLocalStorage('todoID', 1);

  // HTML Element Ref
  const nameInputEl = useRef(null);

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
   * The number of todos remaining.
   * @returns {number}
   */
  function remainingCalculation() {
    return todos.filter(todo => !todo.isCompleted).length;
  }

  const remaining = useMemo(remainingCalculation, [todos]);

  /**
   * Clear completed todos.
   */
  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isCompleted));
  }

  /**
   * Complete all todos.
   */
  function completeAll() {
    setTodos(todos.map(todo => {
      todo.isCompleted = true;

      return todo;
    }));
  }

  /**
   * Filter todos by type.
   * @param {string} type - The type of todos to filter by.
   * @returns {array} - The filtered todos.
   */
  function todosFiltered(filter) {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.isCompleted);

      case 'completed':
        return todos.filter(todo => todo.isCompleted);

      default:
        return todos;
    }
  }

  /**
   * Handle the name input change.
   * @param {*} event 
   */
  function handleNameInput(event) {
    setName(event.target.value);
  }

  /**
   * When component mounts, focus the name input.
   */
  useEffect(() => {
    nameInputEl.current.focus()
  }, [])

  /**
   * Template
   */
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <div className="name-container">

          <h2>What is your name?</h2>
          <form action="#">
            <input
              type="text"
              ref={nameInputEl}
              name="name"
              className="todo-input"
              placeholder="What is your name?"
              value={name}
              onChange={handleNameInput}
            />
          </form>
          {name && <p className="name-label">Hello, {name}</p>}
        </div>
  
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />

        { todos.length > 0 ? (
          <TodosList 
            todos={todos}
            todosFiltered={todosFiltered}
            completeTodo={completeTodo}
            isEditing={isEditing}
            updateTodo={updateTodo}
            removeTodo={removeTodo}
            remaining={remaining}
            clearCompleted={clearCompleted}
            completeAll={completeAll}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;