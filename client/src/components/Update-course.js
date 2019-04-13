import React from 'react';
import axios from 'axios';


class UpdateCourse extends React.Component {

// Initialise local state:
// Is writing them all out like this necessary? How is line 29 actually mapping to this or is it not?
// Yes, there is something going on here. You had to add .user for it to populate state with user data.
// this.setState({course:response.data})
// this.setState({user:response.data.user})
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
    errors: [],
  };

    componentDidMount() {
      const { match: {params} } = this.props.props[1]; // take the params from the match object and pass in below to dynamically generate url
      axios.get(`http://localhost:5000/api/courses/${params.id}`)
        .then( (response) => {
          // handle success
          this.setState({course:response.data})
          this.setState({user:response.data.user})
        })
        .catch(function (error) {
          // handle error
        })
        .then(function () {
          // always executed
        });
    }

    // Individual event handlers for each input change
    // Spread (...) over the prevState object to get all its properties,
    // then overwrite only those properties stated with the ones we're passing. new data
    // prevState https://gist.github.com/klikstermkd/e56e120ad9559aa44dfeaa3b13cfb25d
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

    // Define event handlers as a method on the class (using two different approaches)
    handleSubmit(event) {
      event.preventDefault();

      const { match: {params} } = this.props.props[1]; // take the params from the match object and pass in below to dynamically generate url
      // Send a POST request
      axios({
        method: 'put',
        url: `http://localhost:5000/api/courses/${params.id}`,
        data: {
          "title":this.state.course.title,
          "description":this.state.course.description,
          "user":this.state.user._id,
          "materialsNeeded":this.state.course.materialsNeeded,
          "estimatedTime":this.state.course.estimatedTime
        },
        auth: {
          username: this.props.props[0].auth.username,
          password: this.props.props[0].auth.password
        }
      }).then( (response) => {
        // handle success

        // The below does nothing. So how is Catalogue rendering with a fresh state?
        // this.setState({course:response.data})

        this.props.props[1].history.push('/courses/') // return the user to the courses catalogue page

      })
      .catch( (error) => {
        // handle error
        this.setState({
          errors: error.response.data.errors
        });
      })
      .then(function () {
        // always executed
        // console.log("This always fires, apparently")
      });

    }

    handleCancel = event => {
      event.preventDefault();
      const { match: {params} } = this.props.props[1]; // take the params from the match object and pass in below to dynamically generate url
      const { history } = this.props.props[1];
      history.push(`/courses/${params.id}`)


    }

  render() {
    let validationHTML;

    if (this.state.errors) {
      // This error code only works for 400 errors. If user not signed in (401) then my api routes it differently
      // Due to '<ProtectedRoute> feature however users not signed in wouldn't have access to Create-course page anyway
      // But this is why you've to check for this.state.errors first, as when practising with ProtectedRoutes turned off the 401's caused below to bug out
      if (this.state.errors.length > 0) {
        const errors = this.state.errors;

        let mappedErrors = errors.map(error => (
          <li key={error.toString()}>{error}</li>
        ));

        validationHTML =
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {mappedErrors}
            </ul>
          </div>
        </div>
      }
    }
    return (
      <div className="bounds course--detail">
          <h1>Update Course</h1>
          <div>
          {validationHTML}
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                  <input
                  id="title"
                  name="title"
                  type="text"
                  className="input-title course--title--input"
                  placeholder="Course title..."
                  value={this.state.course.title || ''}
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
                  value={this.state.course.description || ''}
                  onChange={this.descriptionChange}
                  >
                  </textarea></div>
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
                          value={this.state.course.estimatedTime || ''}
                          onChange={this.estimatedTimeChange}
                          />
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
                        value={this.state.course.materialsNeeded || ''}
                        onChange={this.materialsNeededChange}
                        >
                      </textarea></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Update Course</button>
                <button className="button button-secondary" onClick={this.handleCancel.bind(this)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
    )
  }
}


export default UpdateCourse;
