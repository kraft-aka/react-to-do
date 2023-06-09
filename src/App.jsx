import { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
import "./styles.css";
import { useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("items");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  };

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
      <NewTodoForm addTodo={addTodo} />
      <h1 className="header">TODO List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
};

export default App;
