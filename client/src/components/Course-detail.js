import React from 'react';
import axios from 'axios';
import ReactMarkdown from "react-markdown"
import { NavLink } from 'react-router-dom';

// Experiment for DELETE process
import Catalogue from './Catalogue';


class CourseDetail extends React.Component {

  state = {
      course: '',
      user: {
        isLoggedIn: false
      },
      // isLoggedIn: false
    };

    // state.isLoggedIn will work
    // state.user.isLoggedIn does not work. React will only go one deep.
    // Might you need to play with your state structure?

  componentDidMount() {
    const { match: {params} } = this.props; // take the params from the match object and pass in below to dynamically generate url
    axios.get(`http://localhost:5000/api/courses/${params.id}`)
      .then( (response) => {
        // handle success
        this.setState({course:response.data})
        this.setState({courseId: this.state.course.user._id});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  // I prefer this pattern. Refine the below later.
  // detectChange = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }

  // onChange={event => this.detectChange(e)}

  displayCourseDetail(){
    if(this.state.course) {
            return (
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{this.state.course.title}</h3>
                <p>By {this.state.course.user.firstName} {this.state.course.user.lastName}</p>
              </div>
            )
    } else {
    }
  }


  displayCourseDescription(){
    if(this.state.course) {
            return (
              <div className="course--description">
              <ReactMarkdown source={this.state.course.description}/>
              </div>
            )
    } else {
    }
  }

  displayCourseTime(){
    if(this.state.course) {
    if(this.state.course.estimatedTime) {
            return (
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{this.state.course.estimatedTime}</h3>
              </li>
            )
    } else {
      return (
        <li className="course--stats--list--item">
          <h4>Estimated Time</h4>
          <h3>No estimate is available</h3>
        </li>
      )
    }
  }
  }


  displayCourseMaterials(){
    if(this.state.course) {
      if(this.state.course.estimatedTime) {
        return (
          <li className="course--stats--list--item">
            <h4>Materials Needed</h4>
            <ReactMarkdown source={this.state.course.materialsNeeded}/>
          </li>
        )
      } else {
        return (
          <li className="course--stats--list--item">
            <h4>Materials Needed</h4>
            <h3>No materials required</h3>
          </li>
        )
      }
    }
  }


  deleteCourse(event) {
      // console.log("Delete has fired");
      const { match: {params} } = this.props; // take the params from the match object and pass in below to dynamically generate url
      // Send a DELETE request
      axios({
        method: 'delete',
        url: `http://localhost:5000/api/courses/${params.id}`,
      }).then( (response) => {
        this.setState({course:response.data})

        
        this.props.history.push('/courses/') // return the user to the courses catalogue page
        // This is calling the componentDidMount method, but getting this error:
        // "index.js:1446 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }


// Restrict access to course update and delete button if no user or user is not owner.
  displayUpdateButton() {
    let courseId = this.state.courseId;
    let userProp = this.props.user;
    if(userProp.isloggedin === true) {
      if(userProp.id === courseId) {
        // console.log(userProp.id);
        // console.log(courseId);
        // console.log("OK");
          return (
            <React.Fragment>
              <NavLink className="button" to='/' onClick={this.deleteCourse.bind(this)}>Delete Course</NavLink>
              <NavLink className="button" to={`/courses/${this.state.course._id}/update`}>Update Course</NavLink>
            </React.Fragment>
          )
      } else {
        console.log("Correct error. Logged in user != course owner ");
      }
    } else {
      console.log("No logged in user");
    }
  }


  render() {
    return (
      <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100"><span>
          {this.displayUpdateButton()}
          </span>
          <NavLink className="button button-secondary" to='/'>Return to List</NavLink></div>
        </div>
      </div>
      <div className="bounds course--detail">
        <div className="grid-66">
          {this.displayCourseDetail()}
          {this.displayCourseDescription()}

        </div>

        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              {this.displayCourseTime()}
              {this.displayCourseMaterials()}
            </ul>
          </div>
        </div>
      </div>
    </div>
    )
  }
}


export default CourseDetail;
