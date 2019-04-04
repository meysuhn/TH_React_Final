import React from 'react';
import { NavLink } from 'react-router-dom';
// import { Consumer } from './Context/auth.js'

// <Consumer>
//   {/* A render prop needs to be used inside of <Consumer> */}
// </Consumer>

const Header = (props) => {
  console.log(props);

  let headerNav;
  if (props.userData.user.isloggedin !== false ) {
    headerNav = <span>Welcome {props.userData.user.firstName} {props.userData.user.lastName}!</span>
  } else {
    headerNav =
    <NavLink className="signout" to="/signin">Sign In</NavLink>
  }
  return (
    <React.Fragment>
      <div className="header">
        <div className="bounds">
          <NavLink to='/'><h1 className="header--logo">Courses</h1></NavLink>
          <nav>
          {headerNav}
          <a className="signout" href="index.html">Sign Out</a>
          </nav>
        </div>
      </div>
      <hr/>
    </React.Fragment>
  )
}


export default Header;
