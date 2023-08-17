import React, { useState } from 'react';
import './App.css';

function App() {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Completed');
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleStatusChange = (todo) => {
    const newStatus = todo.status === 'Completed' ? 'Not Completed' : 'Completed';
    updateTodoStatus(todo, newStatus);
  };

  const addTodo = () => {
    if (taskName && description) {
      const newTodo = {
        taskName,
        description,
        status: 'Not Completed'
      };
      setTodos([...todos, newTodo]);
      setTaskName('');
      setDescription('');
    }
  };

  const updateTodoStatus = (todo, newStatus) => {
    const updatedTodos = todos.map((t) => {
      if (t === todo) {
        return { ...t, status: newStatus };
      }
      return t;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (todo) => {
    const updatedTodos = todos.filter((t) => t !== todo);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterStatus === 'all') return true;
    return todo.status === filterStatus;
  });

  return (
    <div className="app">
      <h1>Todo</h1>
      <div className="filters">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
      </div>
      <div className="add-todo">
        <h2>Add Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="todo-list">
        {filteredTodos.map((todo, index) => (
          <div key={index} className="todo-card">
            <h3>{todo.taskName}</h3>
            <p>{todo.description}</p>
            <p>
              Status:{' '}
              <span
                className={`status ${todo.status.toLowerCase()}`}
                onClick={() => handleStatusChange(todo)}
              >
                {todo.status}
              </span>
            </p>
            <button onClick={() => deleteTodo(todo)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
