import React, { Component } from 'react';
import './Global.css'; // Original create-react-app
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


// const { history } = this.props;


// Import Context provider
// import { Provider } from './components/Context/auth.js';
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
    };
  }



  signIn = (userInput) => {
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
      user.daFuck = true;
      this.setState({user})
      this.setState({auth: response.config.auth})
      // this.props.history.push('/'); // This doesn't work.


      })
      .catch(function (error) {
        // handle error
        console.log(error);
        console.log("fired");
        // setState to
      })
      .then(function () {
        // always executed
        // this.props.history.push('/');
      });
    }

    // signOut = () => {
    //   let user = {...this.state.user}
    //   user.id = '';
    //   user.firstName = '';
    //   user.lastName = '';
    //   user.email = '';
    //   user.password = '';
    //   user.isloggedin = false;
    //   this.setState({user})
    //   this.setState({auth: null})
    //   // Also need some sort of redirect on here
    // }



// to quickly paste in
  // Header
    // <Header userData={this.state}/>

  // Catalogue
    // <Route exact path={["/", "/courses", "/squirtle"]} component={Catalogue} />

  // CreateCourse
    // <Route exact path="/courses/create" component={CreateCourse} />
    // <Route exact path="/courses/create" component={() => <CreateCourse signIn={this.state}/>}  />

  // CourseDetail
    // <Route exact path="/courses/:id" component={CourseDetail} />
    // <Route exact path="/courses/:id" component={() => <CourseDetail stuff={this.state}/>}  />

  // UpdateCourse
    // <Route exact path="/courses/:id/update" component={UpdateCourse} />
    // <Route exact path="/courses/:id/update" component={() => <UpdateCourse props={this.state}/>}  />

  // Sign in
    // <Route exact path="/signin" component={() => <SignIn  signIn={this.signIn}/>} />

  // Sign out

  // Sign up





  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header userData={this.state}/>
          <Switch>
            <Route exact path={["/", "/courses", "/squirtle"]} component={Catalogue} />

            <Route
              exact path="/courses/create"
              render={(props) => (<CreateCourse {...this.props} {...props} {...this.state}/>)}
            />

            <Route
              exact path="/courses/:id"
              render={(props) => (<CourseDetail {...this.props} {...props} {...this.state}/>)}
            />

            {/* <Route exact path="/courses/:id/update" component={UpdateCourse} /> */}
            <Route
              exact path="/courses/:id/update"
              render={(props) => (<UpdateCourse {...this.props} {...props} {...this.state}/>)}
            />



            {/* If I use the pattern below I lose the match object. Without it tho I can't access auth data. */}
            {/* <Route exact path="/courses/:id/update" component={() => <UpdateCourse signIn={this.state}/>} /> */}
            {/* Make signIn method available to SignIn component.*/}

            <Route exact path="/signin" component={() => <SignIn  signIn={this.signIn}/>} />
            {/*<Route exact path="/signout" component={SignOut} />*/}
            <Route exact path="/signout" component={() => <SignOut signOut={this.signOut}/>} />

            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

// <Route
//   path={`${this.props.match.url}view/:postId`}
//   render={(props) => (
// <Single {...this.props} {...props} />
// )} />

// <Route exact path="/signin" component={SignIn} />
export default App;
