import React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import {connect} from 'react-redux';
import * as actions from '../actions';

 
export class Login extends React.Component{
  constructor(props){
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
  } 

  responseFacebook (response) {
    localStorage.setItem('user_info', JSON.stringify(response));
    console.log(localStorage);
    this.props.dispatch(actions.login(response));
  }
 
  render () {
    return (
      <div>
        <FacebookLogin socialId="319335501841225"
                       language="en_US"
                       scope="public_profile,email"
                       responseHandler={this.responseFacebook}
                       xfbml={true}
                       fields="id,email,name"
                       version="v2.5"
                       className="facebook-login"
                       buttonText="Login With Facebook"/>
      </div>
    );
  }
 
}
 
export default connect()(Login);
 