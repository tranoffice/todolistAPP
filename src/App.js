import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-title">Welcome to Todo List App</span>
        </header>
        <TodoList/>
      </div>
    );
  }
}

export default App;
