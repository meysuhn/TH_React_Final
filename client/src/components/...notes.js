// I'm trying to work out which of the props I actually need
// then to work out how to add them on to the props object in the new pattern

/*
<Route
  exact path="/courses/create"
  render={(props) => (<CreateCourse
    {...this.props} // Deleting this one first. Seems to work fine without it!
    {...props} // Without this you lose the match, location and history objects
    {...this.state} // I'm guessing then that removing this prevents auth. CORRECT!
        // So it's "spreading" over state's properties and adding to props.
  />)}
/>
*/

/*
(1) What are each of the above arguments providing? Take them out one by one.

via the ...rest HoC route the only props I get are the basic BrowserRoutes ones (location, match, history)

In my original set up CreateCourse has the following:
Props
  auth {}  // contains auth data from app.js. Defined in state in App.js
  errors []   // would hold any API errors. Defined in state in App.js
  history {}
  location {}
  match {}
  signIn fn()   // Defined in App.js. Not sure why it was in CreateCourse and works fine without it.
  user {}  // contains signed in users data. Defined in state in App.js
State
  course {}   // onload this is empty...
  errors []   // onload this is empty...
  user {}   // onload this is empty...

(2) OK, so now I know exactly what's needed the next step is to figure out how to add these on to props.
This is where I'm stuck. I've built props1 but can't seem to get it into the routes...
II've potentially found a pattern that works. It looks clumsy but it's working...

(3) Now I need to check against auth in PrivateRoute and that should be that
 // This must be the last thing now.
 // I can't seem to tease it out
 // It's almost as is <PrivateRoute> doesn't get to see the passed in props...
 // So then how on earth would a comparison ever be made?

 //  There will be an answer somewhere online.
*/
