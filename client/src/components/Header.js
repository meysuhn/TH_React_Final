import React from 'react';
// import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <React.Fragment>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav><span>Welcome Joe Smith!</span><a className="signout" href="index.html">Sign Out</a></nav>
        </div>
      </div>
      <hr/>
    </React.Fragment>
  )
}

// if Logged in do X
// How to check if they're actually logged in though?



// Else do Y


export default Header;
