import React, { Component } from 'react';
import './Global.css';
import axios from 'axios';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';



// Components
import Header from './components/Header';
import Catalogue from './components/Catalogue';
import CourseDetail from './components/Course-detail';
import CreateCourse from './components/Create-course';
import SignIn from './components/Sign-in';
import SignUp from './components/Sign-up';
import SignOut from './components/Sign-out'; // to be built
import UpdateCourse from './components/Update-course';
import PrivateRoute from './components/hoc/PrivateRoute';
// if file was name 'index' you could leave off the final file name as Node will always default to look for an index.js if no file name provided.
// import NotFound from './components/Not-found';
// import Error from './components/Error';
// import Forbidden from './components/Forbidden';



class App extends Component {

  constructor() {
    super();
    this.state = {
      user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        // password: '',
        isloggedin: false
      },
      auth: {
        username: '',
        password: ''
      },
      errors: [],
    };
  }

signIn = (userInput, props) => {

  axios.get('http://localhost:5000/api/users', {
     auth: { // axios basic auth header
        username: userInput.email,
        password: userInput.password
     }
  }).then( (response) => {
    // handle success
    // console.log(this); // If you set up sign like signIn(userInput) {} then it changes the scope of 'this'. You're not sure why.
    // There is also an auth object passed back, and this includes the plain text password too.
    // I could keep the auth object and just pass that in to future requests?
    // Is this a security risk? Is it just because basic auth isn't really to be used in the wild?

    // React doesn't like object nesting, apparently https://stackoverflow.com/questions/43040721/how-to-update-nested-state-properties-in-react
    let user = {...this.state.user}
    user.id = response.data._id;
    user.firstName = response.data.firstName;
    user.lastName = response.data.lastName;
    user.email = response.data.emailAddress;
    user.password = response.config.auth.password;
    user.isloggedin = true;
    user.helloChris = true;
    this.setState({user})
    this.setState({auth: response.config.auth})
    props.history.push('/'); // This doesn't work.


    })
    .catch((error) => { // Need arrow function here. 'function' won't work.
      // handle error
      // Add API's error message to client state to make available to render() below
      if (error) {
        this.setState({
          errors: error.response.data.message
        });
      }
    })
    .then(function () {
      // always executed
    });
  }



signOut = (props) => {
  // This is actually pretty good.
  // Sign-Out component doesn't redner anything
    // It calls the signOut method here in App.js
    // Auth and User global state are reset below and passed in to setState
    // User is redirected to /Courses
    // Caution: If you remove 'props.history.push('/courses/')' it will bug out as Sign-out would be stuck on infinite loop

  let emptyAuth = {
    username: '',
    password: ''
  };
  let emptyUser = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    isloggedin: false
  }
  this.setState({auth: emptyAuth, user: emptyUser, errors: []})

  props.history.push('/courses/') // after sign out push to home page.
  }

render() {
// I could never get this below injeted into any routes...
// let props1 = {};
//   props1.foo = {...this.state};
//   props1.bar = "Elephants";
// var component = <Component {...props} />;

  return (
    <BrowserRouter>
      <div className="App">
        <Header userData={this.state}/>
        <Switch>
          <Route exact path={["/", "/courses", "/squirtle"]} component={Catalogue} />
          {/* I've no idea if the line below is an anti-pattern, but at least everything is getting through.*/}
          <PrivateRoute props={this.state} exact path="/courses/create" component={(props) => <CreateCourse props={[this.state, props]}/>} />
          <Route exact path="/courses/:id" render={(props) => (<CourseDetail {...props} {...this.state}/>)}/>
          <PrivateRoute props={this.state} exact path="/courses/:id/update" component={(props) => <UpdateCourse props={[this.state, props]}/>} />
          <Route exact path="/signin" render={(props) => (<SignIn {...props} {...this.state} signIn={this.signIn}/>)}/>
          <Route exact path="/signout" render={(props) => (<SignOut {...props} signOut={this.signOut}/>)}/>


          <Route exact path="/signup" render={(props) => (<SignUp {...props} signIn={this.signIn}/>)}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
 }
}

export default App;
