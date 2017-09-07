import React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import {connect} from 'react-redux';
import * as actions from '../actions';
import '../css/fb.css';

 
export class Login extends React.Component{
  constructor(props){
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
  } 

  responseFacebook = (response) => {
    localStorage.setItem('user_info', JSON.stringify(response));
    this.props.dispatch(actions.login(response));
    this.props.dispatch(actions.validateUser(response));
    this.props.login();
    this.props.showWelcome();
  }

  guest = () => {
    let user = {
      name: 'Guest',
      id: 99999,
      email: 'guest@guest.com'
    }
    localStorage.setItem('user_info', JSON.stringify(user));
    this.props.dispatch(actions.login(user));
    this.props.dispatch(actions.validateUser(user));
    this.props.login();
    this.props.showWelcome();
    
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

        <button className="facebook-login guest" onClick={this.guest}>Demo as Guest</button>                       
      </div>
    );
  }
 
}
 
export default connect()(Login);
 