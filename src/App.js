import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './components/layouts/header';
import './App.css';
import Todos from './components/Todos';
import AddToDo from './components/AddToDo';
import uuid from 'uuid';

class App extends Component {
  state = {
    todos: [
      {
        id: uuid.v4(),
        title: 'Take out the trash',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Dinner with wife',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Meeting with boss',
        completed: false
      }
    ]
  }

  // Toggle Complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  // Delete To-Do
  delTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  }

  // Add To-Do
  addTask = (title) => {
    const newTask = {
      id: uuid.v4(),
      title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTask] });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <img src={logo} className="App-logo" alt="logo" />
        <AddToDo addTask={this.addTask} />
        <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
      </div>
    );
  }
}

export default App;
