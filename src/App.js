import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import Header from './components/layouts/header';
import './App.css';
import Todos from './components/Todos';
import AddToDo from './components/AddToDo';
import About from './components/pages/About';
// import uuid from 'uuid';
import axios from 'axios';

class App extends Component {
  state = {
    todos: [
      // Todos is now empty array. We use API request to get data
      // {
      //   id: uuid.v4(),
      //   title: 'Take out the trash',
      //   completed: false
      // },
      // {
      //   id: uuid.v4(),
      //   title: 'Dinner with wife',
      //   completed: false
      // },
      // {
      //   id: uuid.v4(),
      //   title: 'Meeting with boss',
      //   completed: false
      // }
    ]
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data}))
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
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));

    // this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  }

  // Add To-Do
  addTask = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));

    // const newTask = {
    //   id: uuid.v4(),
    //   title,
    //   completed: false
    // }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <img src={logo} className="App-logo" alt="logo" />
          <Route exact path='/' render={props => (
            <React.Fragment>
              <AddToDo addTask={this.addTask} />
              <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
            </React.Fragment>
          )} />
          <Route path='/about' component={About} />
        </div>
      </Router>
    );
  }
}

export default App;