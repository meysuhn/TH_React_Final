import React from 'react';
import { NavLink } from 'react-router-dom';



class SignIn extends React.Component {

  state = {
    user: {
      email: '',
      password: ''
    },
  };

  emailChange = (event) => { // when there's a change pass in the event object
      const value = event.target.value;
      this.setState( (prevState) =>(
          {user: {...prevState.user, email:value}}
      ));
  }

  passwordStateChange = (event) => {
      const value = event.target.value;
      this.setState( (prevState) =>(
          {user: {...prevState.user, password:value}}
      ));
  }

  handleSubmit = event => {
    event.preventDefault();
    let userInput = {"email": this.state.user.email, "password": this.state.user.password}
    this.props.signIn(userInput, this.props) // Pass props here so App.js has access to histroy object for push method.

  };

  render() {
    let validationHTML;
    if (this.props.errors.length > 0) {
      // This error code only works for 400 errors. If user not signed in (401) then my api routes it differently
      // Due to '<ProtectedRoute> feature however users not signed in wouldn't have access to Create-course page anyway
      // But this is why you've to check for this.state.errors first, as when practising with ProtectedRoutes turned off the 401's caused below to bug out
      const errors = this.props.errors;
      validationHTML =
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            <li key={errors.toString()}>{errors}</li>
          </ul>
        </div>
      </div>
    }
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
          {validationHTML}
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text" className=""
                  placeholder="Email Address"
                  value={this.state.user.emailAddress}
                  onChange={this.emailChange}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  value={this.state.user.password}
                  onChange={this.passwordStateChange}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <NavLink to='/courses' className="button button-secondary">Cancel</NavLink>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <NavLink to="/signup">Click here</NavLink> to sign up!</p>
        </div>
      </div>
    )
  }
}


export default SignIn;
