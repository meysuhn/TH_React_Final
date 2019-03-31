import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';


class App extends Component {

  componentDidMount() {
    axios.get('localhost:5000/api/courses')
      .then(function (response) {
        console.log(1);
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        console.log(2);
        // handle error
        console.log(error);
      })
      .then(function () {
        console.log(3);
        // always executed
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
