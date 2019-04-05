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

// For some reason the below wouldn't work, but I'm just gonna send them back to "/" without any fancy stuff.
  // handleCancel = event => {
  //   event.preventDefault();
  //       this.props.history.push('/courses/') // return the user to the courses catalogue page
  //       // push is a method on the history object.
  //     }
  // This would go on the button: onClick={this.handleCancel.bind(this)}


  handleSubmit = event => {
    // console.log(this.state)
    // console.log(this.props)
    event.preventDefault();
    let userInput = {"email": this.state.user.email, "password": this.state.user.password}
    // console.log(userInput)
    this.props.signIn(userInput, this.props) // Pass props here so App.js has access to histroy object for push method.

  };

  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
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
