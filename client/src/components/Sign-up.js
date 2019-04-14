import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class SignUp extends React.Component {

  state = {
    user: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      passwordCheck: ''
    },
    errors: [],
  };


  firstNameChange = (event) => { // when there's a change pass in the event object
      const value = event.target.value;
      this.setState( (prevState) =>(
          {user: {...prevState.user, firstName:value}}
      ));
  }

  lastNameChange = (event) => {
      const value = event.target.value;
      this.setState( (prevState) =>(
          {user: {...prevState.user, lastName:value}}
      ));
  }

  emailChange = (event) => {
      const value = event.target.value;
      this.setState( (prevState) =>(
          {user: {...prevState.user, emailAddress:value}}
      ));
  }

  passwordStateChange = (event) => {
      const value = event.target.value;
      this.setState( (prevState) =>(
          {user: {...prevState.user, password:value}}
      ));
  }

  passwordCheckChange = (event) => {
      const value = event.target.value;
      this.setState( (prevState) =>(
          {user: {...prevState.user, passwordCheck:value}}
      ));
  }


  // POST
  handleSubmit = (event) => {
    let userInput = {email: this.state.user.emailAddress, password: this.state.user.password};
    event.preventDefault();
    // Send a POST request
    // This route doesn't require auth. It's a new user.
    axios({
      method: 'post',
      url: 'http://localhost:5000/api/users',
      data: { // You need to pass in the user too.
        firstName:this.state.user.firstName,
        lastName:this.state.user.lastName,
        emailAddress:this.state.user.emailAddress,
        password:this.state.user.passwordCheck,
      },

    }).then( (response) => {
      // handle success
        if (response.status === 201) {
          // pass the user input object with new user's details to the signIn method.
          this.props.signIn(userInput, this.props) // Pass props here so App.js has access to history object for push method.
        }

        // Or if you'd prefer to push them to signin page instead use:
        // this.props.history.push('/signin'); // Push the user to the sign in page for them to sign in.
    })
    .catch( (error) => {
      // handle error
      if(error) {
        this.setState({
          errors: error.response.data.errors
        });
      }
    })
    .then(function () {
      // always executed
    });

  }

  render() {
    let validationHTML;

    if (this.state.errors) {
      // This error code only works for 400 errors. If user not signed in (401) then my api routes it differently
      // Due to '<ProtectedRoute> feature however users not signed in wouldn't have access to Create-course page anyway
      // But this is why you've to check for this.state.errors first, as when practising with ProtectedRoutes turned off the 401's caused below to bug out
      if (this.state.errors.length > 0) {
        const errors = this.state.errors;
        // Loop over errors in state and display an <li> for each
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
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
          {validationHTML}
            <form>
              <div>
                <input
                id="firstName"
                name="firstName"
                type="text"
                className=""
                placeholder="First Name"
                value={this.state.user.firstName}
                onChange={this.firstNameChange}/>
              </div>
              <div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className=""
                placeholder="Last Name"
                value={this.state.user.lastName}
                onChange={this.lastNameChange}/>
              </div>
              <div>
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                className=""
                placeholder="Email Address"
                value={this.state.user.emailAddress}
                onChange={this.emailChange}/>
              </div>
              <div>
                <input
                id="password"
                name="password"
                type="password"
                className=""
                placeholder="Password"
                value={this.state.user.password}
                onChange={this.passwordStateChange}/>
              </div>
              <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className=""
                placeholder="Confirm Password"
                value={this.state.user.passwordCheck}
                onChange={this.passwordCheckChange}/>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit" onClick={this.handleSubmit.bind(this)}>Sign Up</button>
                <NavLink to='/courses' className="button button-secondary">Cancel</NavLink>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <NavLink to="/signin">Click here</NavLink> to sign in!</p>
        </div>
      </div>
    )
  }
}


export default SignUp;
