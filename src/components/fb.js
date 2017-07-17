import React from 'react';

import LoginHOC from 'react-facebook-login-hoc'

const configureLoginProps = {
  scope: 'email',
  xfbml: false,
  cookie: false,
  version: 2.6,
  language: 'en_US',
  appId: '319335501841225'
}

class Fb extends React.Component {
  constructor(props) {
    super(props)
 
    this.status = this.props.fb.status
    this.login = this.props.fb.login
    this.logout = this.props.fb.logout
  }
  getStatus(response) {
    if (response.authResponse) {
      this.responseApi.call(this, response.authResponse)
    }
  }
  responseApi(res) {
    console.log('response:', res)
  }
  checkLoginState() {
    this.status(this.getStatus.bind(this))
  };
  loginFacebook() {
    this.login(this.getStatus.bind(this))
  }
  logoutFacebook() {
    this.logout()
  }
  render() {
    return (
      <div>
        <button onClick={ this.checkLoginState.bind(this) }>Get Facebook Login Status</button>
        <button onClick={ this.loginFacebook.bind(this) }>Facebook Login</button>
        <button onClick={ this.logoutFacebook.bind(this) }>Facebook Logout</button>
      </div>
    );
  }
}
export default LoginHOC(configureLoginProps)(Fb);
