

function UserSignOut() {
  console.log("fired")
  // Redirect to "/"
  // This is native JS, not react. It's having the effect of scrubbing the auth data.
  // Why? - I think it's because it's also forcing a browser reload and as you're data doesn't persist...
  // I think this is a bit of hack and would need to be improved later.
  window.location.replace('/')

  // What would be a more elegant solution
  // OK, so this function is called.
  // It would need to have access to the auth state, delete it.
  // Then it needs to redirect to "/" via React. 


}


export default UserSignOut;
