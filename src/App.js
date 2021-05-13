import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';

function App() {

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');
  const [saving, setSaving] = useState(false);

  function onChange(e) {
    const val = e.target.value;
    setNewTodo(val);
  }

  function addTodo(e) {
    e.preventDefault();
    const value = {
      userId: 3,
      id: Math.floor(Math.random() * 100) + 1,
      title: newTodo,
      completed: false
    };

    setSaving(true);

    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json; chartset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(result => {
        setTodos(todos.concat({ ...result, id: value.id }));
        setSaving(false);
      })
  }

  function removeTodo(id) {
    setTodos(todos.filter(item => item.id != id));
  }

  function updateTodo(id) {
    const newList = todos.map(item => {
      if (item.id == id) {
        const updatedItem = { ...item, completed: !item.completed };
        return updatedItem;
      }

      return item;
    });

    setTodos(newList);
  }

  useEffect(() => {

    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const result = await response.json();
      setTodos(result.slice(0, 5));
      setLoading(false);
    }

    fetchData();

  }, []);

  return (
    <div className="App">
      <h1 className="header">My todo list</h1>
      {loading ? 'Loading' : <TodoList todos={todos} removeHandler={removeTodo} updateHandler={updateTodo} />}

      <div className="add-todo-form">
        {saving ? ('Saving') : (
          <form onSubmit={addTodo}>
            <input type="text" onChange={onChange} />
            <button type="submit">Add new todo</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;

