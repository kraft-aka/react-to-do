import { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import "./styles.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (title) => {
    setTodos(prevTodos => {
      return [ 
        ...prevTodos,
        {id: crypto.randomUUID(), title, completed: false }
      ]
    })
  }
  

  const toggleTodo = (id, completed) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <>
      <NewTodoForm addTodo={addTodo}/>
      <h1 className="header">TODO List</h1>
      <ul className="list">
        {todos.length === 0 && 'No todos yet!'}
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label htmlFor="">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default App;
