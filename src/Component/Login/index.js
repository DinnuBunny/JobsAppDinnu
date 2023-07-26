// Login
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isLoginSuccess: '',
    errorMessage: '',
  }

  getTheErrorResponse = () => {
    const {errorMessage} = this.state
    return <p className="error">*{errorMessage}</p>
  }

  onLoginSuccess = data => {
    const jwtToken = data.jwt_token
    Cookie.set('jwt_token', jwtToken, {expires: 30})
    this.setState({isLoginSuccess: true, username: '', password: ''})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = data => {
    this.setState({isLoginSuccess: false, errorMessage: data.error_msg})
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const credentials = {username, password}
    const loginAPi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
    const response = await fetch(loginAPi, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data)
    } else {
      this.onLoginFailure(data)
    }
  }

  onUsernameEnter = event => {
    this.setState({username: event.target.value})
  }

  onPasswordEnter = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isLoginSuccess} = this.state
    const token = Cookie.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-website-logo"
          />
          <form onSubmit={this.onLogin} className="login-form">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              id="username"
              placeholder="Username"
              value={username}
              type="text"
              onChange={this.onUsernameEnter}
              className="input"
            />

            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              placeholder="Password"
              value={password}
              type="password"
              onChange={this.onPasswordEnter}
              className="input"
            />
            <button type="submit" className="login-submit-btn">
              Login
            </button>
            {isLoginSuccess === false && this.getTheErrorResponse()}
          </form>
          <p className="sample-username">
            Samples - Username:
            <span className="credentials"> rahul</span> Password:{' '}
            <span className="credentials"> rahul@2021</span>
          </p>
        </div>
      </div>
    )
  }
}

export default Login
