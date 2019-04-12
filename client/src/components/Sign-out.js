import React from 'react';

// Sign-Out component doesn't render anything

class SignOut extends React.Component {
  // This method sits on App.js. It's called from here when user clicks 'Sign-out' in Header.js
  // Nothing is rendered in this componenet, only the callSignOutMethod is called.
  // It calls the signOut method on App.js (that it's given access to via App.js's <Routes>)
  // Auth and User global state in App.js are reset and passed in to setState
  // User is redirected to /Courses
  callSignOutMethod(props) {
    this.props.signOut(this.props) // Pass props here so App.js has access to histroy object for push method.
  }



  render() {
    this.callSignOutMethod() // Called on mounting.
    return (
      <React.Fragment></React.Fragment> // Allows for component to load (and run callSignOutMethod without rendering anything
    )
  }
}


export default SignOut;




// Below is your old method that literally just reloaded the browser and cleared.
// It wasn't very good. Your approach above is much better.

// function UserSignOut() {
//   // console.log("fired")
//   // Redirect to "/"
//   // This is native JS, not react. It's having the effect of scrubbing the auth data.
//   // Why? - Because it's  forcing a browser reload and as your data doesn't persist...
//   // I think this is a bit of a crass hack and would need to be improved later.
//   window.location.replace('/')
//
//   // What would be a more elegant solution
//   // It would need to have access to the auth state, delete it.
//   // Then it needs to redirect to "/" via React.
// }
//
//
// export default UserSignOut;
