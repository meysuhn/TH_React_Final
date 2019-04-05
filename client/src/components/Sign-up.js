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

  emailChange = (event) => { // when there's a change pass in the event object
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
  // Define event handlers as a method on the class (using two different approaches)
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    console.log(this.props);
    console.log("POST fired");



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

      // User creds not being passed in
      // I think it's the API that asigns the user to the new course...

      // Are the data details overwriting state? NO. But then that state is only updated on a submit.
      // You're forming that basis of a question here. Good.


    }).then( (response) => {
      // handle success
      // this.setState({course:response.data})
      console.log("Success");
      // Push the user to the sign in page for them to sign in.
      this.props.history.push('/signin');
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
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
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
          <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
        </div>
      </div>
    )
  }
}


export default SignUp;
