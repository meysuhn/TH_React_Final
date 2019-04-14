import React from 'react';
import { NavLink } from 'react-router-dom';


// Componennt to build indidual courses on main catalogue page.
  // Imported and used by Catalogue.js
const Item = (props) => {
  return (
    <div className="grid-33">
      <NavLink className="course--module course--link" to={`/courses/${props.id}`}> {/*Adds Navlink for Course Detail feature*/}
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{props.title}</h3>
      </NavLink>
    </div>
  )
}


export default Item;
