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
  };

    componentDidMount() {
      const { match: {params} } = this.props; // take the params from the match object and pass in below to dynamically generate url
      console.log(this)
      axios.get(`http://localhost:5000/api/courses/${params.id}`)

        .then( (response) => {
          // handle success
          this.setState({course:response.data})
          this.setState({user:response.data.user})
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
      console.log(this.state);
      console.log(this.props);
      console.log("PUT fired");



      // axios({
      //   method: 'post',
      //   url: 'http://localhost:5000/api/courses/',
      //   data: { // You need to pass in the user too.
      //     title:this.state.course.title,
      //     description:this.state.course.description,
      //     materialsNeeded:this.state.course.materialsNeeded,
      //     estimatedTime:this.state.course.estimatedTime,
      //     user:this.state.user._id,
      //   },
      //   auth: {
      //     username: this.props.signIn.auth.username,
      //     password: this.props.signIn.auth.password
      //   }

      const { match: {params} } = this.props; // take the params from the match object and pass in below to dynamically generate url
      // Send a POST request
      axios({
        method: 'put',
        url: `http://localhost:5000/api/courses/${params.id}`,
        data: {
          "title":this.state.course.title,
          "description":this.state.course.description,
          "user":this.state.user._id,
          "materialsNeeded":this.props.materialsNeeded,
          "estimatedTime":this.props.estimatedTime
        },
        auth: {
          username: this.props.auth.username,
          password: this.props.auth.password
        }
        // auth: { // axios basic auth header
        //     username: userInput.email,
        //     password: userInput.password
        // }
      }).then( (response) => {
        // handle success
        this.setState({course:response.data})
        console.log(this.state.course);
        this.props.history.push('/courses/') // return the user to the courses catalogue page
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    }

    handleCancel = event => {
      event.preventDefault();
      const { match: {params} } = this.props; // take the params from the match object and pass in below to dynamically generate url

          const { history } = this.props;
          // const { course } = this.state;
          history.push(`/courses/${params.id}`)
        }

  render() {
    return (
      <div className="bounds course--detail">
          <h1>Update Course</h1>
          <div>
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
