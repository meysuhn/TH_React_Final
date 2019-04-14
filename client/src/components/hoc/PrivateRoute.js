import React from "react";
import {
    Route,
    Redirect,
  } from "react-router-dom";


// This component wraps around two private routes declared in App.js.
  // If user not signed in then access to those two pages is prevented.
const PrivateRoute = ({ component: Component, ...rest  }) => ( // See notes below for explanation of this.
   <Route {...rest} render={(props) => (
     rest.props.user.isloggedin === true // this is essentially an 'if' statement
       ? <Component {...props}/> // (do this)
       : <Redirect to='/signin' /> // (otherwise do this)
   )} />
)


export default PrivateRoute;



// // NOTES
// // <PrivateRoute> is not native React Router behaviour. It's just a design pattern that happens to be very handy for this specific purpose.
// // So I think you could name it anything, like <BingoRoute> and it would still work.
// // Essentially you're wrapping a custom component (<PrivateRoute> around a component(s) that you want to protect in some way
// // So now, in App.js, when some clicks on Create Course they're going to be actually directed to <PrivateRoute>...
// // ... <PrivateRoute> will itself (below) return the actual CreateCourse component if your custom condition is satisfied...
// // ... i.e. if the user is signed in.
// ///
//
// // What '{ component: Component, ...rest }' means:
// // see https://stackoverflow.com/questions/43484302/what-does-it-mean-rest-in-react-jsx
// /*
// To give an accurate explanation, let's break down the { component: Component, ...rest } expression into two separate operations:
//
// Operation 1: Find the component property defined on props (Note: lowercase component)
// and assign it to a new location in state we call Component (Note: capital Component).
//
// Operation 2: Then, take all remaining properties defined on the props object and collect them inside an argument called rest.
// The important point is that you're NOT renaming props to rest. (And nor does it have to do with trying
//  to "avoid naming issues with the props passed to the Route render function".)
// */
//
// // Understanding the Ternary Operator:
// // Below you're passing in the Route you want to make available to the user if the condition is met
// // for example 'CreateCourse'
// // You're using the ternary operator instead of 'if'
// //   (if this condition evalutes to true)
// //   ? (do this)
// //   : (otherwise do this)
