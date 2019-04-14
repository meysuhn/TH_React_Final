import React from 'react';


class SignOut extends React.Component {

  componentDidMount() {
    this.props.signOut(this.props) // Pass props here so App.js has access to histroy object for push method.
  }

  render() {
    return (null); // Render nothing.
  }
}

export default SignOut;


// NOTES
// Sign-Out component isn't meant to render anything, only remove auth data and redirect.

// This method sits on App.js. It's called from here when user clicks 'Sign-out' in Header.js
// Nothing is rendered in this componenet, only the callSignOutMethod is called.
// It calls the signOut method on App.js (that it's given access to via App.js's <Routes>)
// Auth and User global state in App.js are reset and passed in to setState
// User is redirected to /Courses

// this.callSignOutMethod(this.props) // This line used to sit inside the render() above.
// Placing the above line of code in render() caused React errors. Why? well because...
/* Functional components are expected to be pure functions, i.e. contain no side effects,
and the above line in render() provides side effects.
Side effects are supposed to be applied after the component is mounted, that's the purpose of componentDidMount hook.
*/



// Below is your old method that literally just reloaded the browser and cleared.
// It wasn't very good. Your approach above is much better.

// function UserSignOut() {
//   // console.log("fired")
//   // Redirect to "/"
//   // This is native JS, not react. It's having the effect of scrubbing the auth data.
//   // Why? - Because it's  forcing a browser reload and as your data doesn't persist...
//   // I think this is a bit of a crass hack and would need to be improved later.
//   window.location.replace('/')
// }
//
//
// export default UserSignOut;
