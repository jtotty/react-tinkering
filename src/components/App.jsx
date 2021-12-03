import { useState, useRef, useEffect } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodosList from './TodosList';
import useLocalStorage from '../hooks/useLocalStorage';
import { TodosContext } from '../context/TodosContext';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import '../css/reset.css';
import '../css/App.css';

function App() {
  const [name, setName] = useLocalStorage('name', '');
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [todoID, setTodoID] = useLocalStorage('todoID', 1);
  const [filter, setFilter] = useState('all');

  // HTML Element Ref
  const nameInputEl = useRef(null);

  /**
   * Filter todos by type.
   * @returns {array} - The filtered todos.
   */
  function todosFiltered() {
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

  return (
    <TodosContext.Provider value={{ 
      todos, setTodos, todoID, setTodoID, todosFiltered, filter, setFilter 
    }}>
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

            <CSSTransition
              in={name.length > 0}
              timeout={300}
              classNames="slide-vertical"
              unmountOnExit
            >
              <p className="name-label">Hello, {name}</p>
            </CSSTransition>
          </div>
    
          <h2>Todo App</h2>
          <TodoForm />

          <SwitchTransition mode="out-in">
            <CSSTransition key={todos.length > 0} timeout={300} classNames="slide-vertical" unmountOnExit>
              { todos.length > 0 ? <TodosList /> : <NoTodos /> }
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;