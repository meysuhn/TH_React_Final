import React from 'react';
import { NavLink } from 'react-router-dom';
// import { Consumer } from './Context/auth.js'

// <Consumer>
//   {/* A render prop needs to be used inside of <Consumer> */}
// </Consumer>

// <NavLink to='/signout' className="signout">Sign Out</NavLink>

const Header = (props) => {
  console.log(props);

  let headerNav;
  if (props.userData.user.isloggedin !== false ) {
    headerNav =
    <React.Fragment>
      <span>Welcome {props.userData.user.firstName} {props.userData.user.lastName}!</span>
      <NavLink to='/signout' className="signout">Sign Out</NavLink>
      {/* NavLink to /signout -> app.js then renders coresponding component -> component only contains a function that forces reload (and thus data scrub).*/}
    </React.Fragment>
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
          </nav>
        </div>
      </div>
      <hr/>
    </React.Fragment>
  )
}


export default Header;
