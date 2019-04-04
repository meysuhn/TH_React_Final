import React from 'react';
import axios from 'axios';



class CreateCourse extends React.Component {
  state = {
    course: {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: ''
    },
    user: {
      id: '',
      firstName: '',
      lastName: ''
    },
  };

// This isn't a componentDidMount scenario. You only want to fire the POST request once user hits submit.
// Individual event handlers for each input change
// Spread (...) over the prevState object to get all its properties,
// then overwrite only those properties stated with the ones we're passing. new data
// prevState https://gist.github.com/klikstermkd/e56e120ad9559aa44dfeaa3b13cfb25d

// these are the same as UpdateCourse. It's exactly the same process.
titleChange = (event) => { // when there's a change pass in the event object
    const value = event.target.value;
    this.setState( (prevState) =>(
        {course: {...prevState.course, title:value}}
    ));
}

descriptionChange = (event) => {
    const value = event.target.value;
    this.setState( (prevState) =>(
        {course: {...prevState.course, description:value}}
    ));
}
estimatedTimeChange = (event) => {
    const value = event.target.value;
    this.setState( (prevState) =>(
        {course: {...prevState.course, estimatedTime:value}}
    ));

}
materialsNeededChange = (event) => {
    const value = event.target.value;
    this.setState( (prevState) =>(
        {course: {...prevState.course, materialsNeeded:value}}
    ));
}

handleCancel = event => {
  event.preventDefault();
      this.props.history.push('/courses/') // return the user to the courses catalogue page
      // push is a method on the history object.
    }

// Define event handlers as a method on the class (using two different approaches)
handleSubmit(event) {
  event.preventDefault();
  console.log(this.state);
  console.log("POST fired");


  // Send a POST request
  axios({
    method: 'post',
    url: 'http://localhost:5000/api/courses/',
    data: { // You need to pass in the user too.
      "title":this.state.course.title,
      "description":this.state.course.description,
      "user":this.state.user._id,
      "materialsNeeded":this.props.materialsNeeded,
      "estimatedTime":this.props.estimatedTime,
    },
    auth: this.state.auth


  }).then( (response) => {
    // handle success
    this.setState({course:response.data})
    console.log(this.state.course);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

}


  render() {
    return (
      <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  <li>Please provide a value for "Title"</li>
                  <li>Please provide a value for "Description"</li>
                </ul>
              </div>
            </div>
            <form onClick={this.handleSubmit.bind(this)}>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div><input
                    id="title"
                    name="title"
                    type="text"
                    className="input-title course--title--input"
                    placeholder="Course title..."
                    value={this.state.course.title}
                    onChange={this.titleChange}/>
                  </div>
                  <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                    id="description"
                    name="description"
                    className=""
                    placeholder="Course description..."
                    value={this.state.course.description}
                    onChange={this.descriptionChange}>
                    </textarea>
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        className="course--time--input"
                        placeholder="Hours"
                        value={this.state.course.estimatedTime}
                        onChange={this.estimatedTimeChange}/>
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        className=""
                        placeholder="List materials..."
                        value={this.state.course.materialsNeeded}
                        onChange={this.materialsNeededChange}>
                        </textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={this.handleCancel.bind(this)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
    )
  }
}


export default CreateCourse;
