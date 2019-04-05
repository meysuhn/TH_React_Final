

function UserSignOut() {
  // console.log("fired")
  // Redirect to "/"
  // This is native JS, not react. It's having the effect of scrubbing the auth data.
  // Why? - Because it's  forcing a browser reload and as your data doesn't persist...
  // I think this is a bit of a crass hack and would need to be improved later.
  window.location.replace('/')

  // What would be a more elegant solution
  // It would need to have access to the auth state, delete it.
  // Then it needs to redirect to "/" via React.
}


export default UserSignOut;
