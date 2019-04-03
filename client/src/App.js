import React, { Component } from 'react';
import './Global.css'; // Original create-react-app

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
// import SignOut from './components/Sign-out'; // to be built
import UpdateCourse from './components/Update-course';


// import NotFound from './components/Not-found';
// import Error from './components/Error';
// import Forbidden from './components/Forbidden';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
          <Switch>
            <Route exact path={["/", "/courses", "/squirtle"]} component={Catalogue} />
            <Route exact path="/courses/:id" component={CourseDetail} />
            <Route exact path="/courses/:id/update" component={UpdateCourse} />
            <Route exact path="/courses/create" component={CreateCourse} />
            <Route exact path="/signin" component={SignIn} />
            {/*<Route exact path="/signout" component={SignOut} />*/}
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
