
import React from 'react';
import axios from 'axios';
import Item from './Catalogue-item';
import { NavLink } from 'react-router-dom';


class Catalogue extends React.Component {
  // Initialising state directly inside the class definition using a class property
  state = {
      courses: '',
    };

  componentDidMount() {
    console.log("componentDidMount FIRED")
    axios.get('http://localhost:5000/api/courses')
      .then( (response) => {
        // handle success
        console.log("componentDidMount Success")
        this.setState({courses:response.data})
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  componentWillUnmount() {
      this.isCancelled = true;
  }

  // the problem only happens on the first delete? but not subsequent.
  // significa que tiene que ver solo con componentDidMount?

  componentDidUpdate(prevProps) {
    console.log("UPDATE fired")
    if (this.props !== prevProps) {
      console.log("If on Update fired")
      axios.get('http://localhost:5000/api/courses')
        .then( (response) => {
          // handle success
          this.setState({courses:response.data})
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    } else {

    }

  }

//   componentDidUpdate(prevProps) {
//   // Typical usage (don't forget to compare props):
//   if (this.props.userID !== prevProps.userID) {
//     this.fetchData(this.props.userID);
//   }
// }

  displayAllCourses(){
    if(this.state.courses) {
      return this.state.courses.map( course => {
        return (
          <Item key={course._id} title={course.title} id={course._id}/>
        )
      })
    } else {
    }
  }


  render() {
    return (
      <div className="bounds">
        {this.displayAllCourses()}
        <div className="grid-33">
          <NavLink to='/courses/create' className="course--module course--add--module">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </NavLink>
        </div>
      </div>
    )
  }
}



export default Catalogue;
