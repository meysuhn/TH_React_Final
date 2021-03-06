import React from 'react';
import { NavLink } from 'react-router-dom';


// Main page header that always displays
  // logic below determine what user sees based on whether logged in or not.
const Header = (props) => {

  let headerNav;
  if (props.userData.user.isloggedin !== false ) {
    headerNav =
    <React.Fragment>
      <span>Welcome, {props.userData.user.firstName} {props.userData.user.lastName}!</span>
      <NavLink className="signout" to='/signout'>Sign Out</NavLink>
      {/* NavLink to /signout -> app.js then renders coresponding component -> component only contains a function that forces reload (and thus data scrub).*/}
    </React.Fragment>
  } else {
    headerNav =
    <React.Fragment>
      <NavLink className="signout" to="/signin">Sign In</NavLink>
      <NavLink className="signout" to='/signup'>Sign Up</NavLink>
    </React.Fragment>
  }
  return (
    <React.Fragment>
      <div className="header">
        <div className="bounds">
          <NavLink to='/'><h1 className="header--logo">Courses</h1></NavLink>
          <nav>
          {headerNav}
          </nav>
        </div>
      </div>
      <hr/>
    </React.Fragment>
  )
}


export default Header;
