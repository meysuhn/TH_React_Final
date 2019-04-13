import React, { Component } from 'react';
import './Global.css';
import axios from 'axios';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// I was using
// import { BrowserRouter as Router, Route } from 'react-router'
// instead of:
// import { BrowserRouter as Router, Route } from 'react-router-dom'


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
    // console.log(props)
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
        console.log(error.response.data.message);
        console.log("ficccred");
        // Add API's error message to client state to make available to render() below
        this.setState({
          errors: error.response.data.message
        });
        // setState to
      })
      .then(function () {
        // always executed
        // this.props.history.push('/');
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
      this.setState({auth: emptyAuth})
      this.setState({user: emptyUser})

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

            {/* Old style */}
            {/*
              <Route
                exact path="/courses/create"
                render={(props1) => (<CreateCourse {...props1} {...this.state}/>)}
              />
              */}


            {/* New style
              <Route exact path="/courses/create" component = {CreateCourse} />
              */}

              {/* I've no idea if the line below is an anti-pattern or whatever, but at least everything is getting through.
                */}
            <PrivateRoute props={this.state} exact path="/courses/create" component={(props) => <CreateCourse props={[this.state, props]}/>} />

            <Route
              exact path="/courses/:id"
              render={(props) => (<CourseDetail {...this.props} {...props} {...this.state}/>)}
            />

            {/* <Route exact path="/courses/:id/update" component={UpdateCourse} /> */}

            {/*
              <PrivateRoute
                exact path="/courses/:id/update"
                render={(props) => (<UpdateCourse {...this.props} {...props} {...this.state}/>)}
              />
              */}
            <PrivateRoute props={this.state} exact path="/courses/:id/update" component={(props) => <UpdateCourse props={[this.state, props]}/>} />



            {/* If I use the pattern below I lose the match object. Without it tho I can't access auth data. */}
            {/* <Route exact path="/courses/:id/update" component={() => <UpdateCourse signIn={this.state}/>} /> */}
            {/* Make signIn method available to SignIn component.*/}

            <Route
              exact path="/signin"
              render={(props) => (<SignIn {...this.props} {...props} {...this.state} signIn={this.signIn}/>)}
            />

            {/*<Route exact path="/signout" component={SignOut} />*/}

{/*<Route exact path="/signout" component={() => <SignOut signOut={this.signOut}/>} />*/}
            <Route
              exact path="/signout"
              render={(props) => (<SignOut {...this.props} {...props} {...this.state} signOut={this.signOut}/>)}
            />


            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


// New style for HoC
// <PrivateRoute  component= {CreateCourse}
//               exact path="/courses/create"
//             />




// <Route
//   path={`${this.props.match.url}view/:postId`}
//   render={(props) => (
// <Single {...this.props} {...props} />
// )} />

// <Route exact path="/signin" component={SignIn} />
export default App;
