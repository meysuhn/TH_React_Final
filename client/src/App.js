import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
// import './App.css'; // Original create-react-app
import './global.css';

// Components
import Header from './components/Header';

import CourseDetail from './components/Course-detail';
import CreateCourse from './components/Create-course';
import Error from './components/Error';
import Forbidden from './components/Forbidden';
import Catalogue from './components/Catalogue';
import NotFound from './components/Not-found';
import SignIn from './components/Sign-in';
import SignUp from './components/Sign-up';
import UpdateCourse from './components/Update-course';


class App extends Component {

  componentDidMount() {
    axios.get('http://localhost:5000/api/courses')
      .then(function (response) {
        console.log(1);
        // handle success
        console.log(response.data);
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
        <Header/>
        <UpdateCourse/>
      </div>
    );
  }
}

export default App;
