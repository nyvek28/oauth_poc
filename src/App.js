import React, { Component } from 'react';
import SocialButton from './SocialButton';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
  }

  handleSocialLogin(user) {
    this.setState({
      user: user
    });
  }

  handleSocialLoginFailure(err) {
    console.log(err);
  }

  gaData() {
    if (this.state.user._token.accessToken) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET',
          'https://www.googleapis.com/auth/analytics?' +
          'access_token=' + this.state.user._token.accessToken);
      xhr.onreadystatechange = function (e) {
        console.log(xhr.response);
      };
      xhr.send(null);
    } else {
      alert("nope");
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SocialButton
          provider="google"
          appId="830991144249-dnd3pivonjjfg5mp2ark8idncvarhmmj.apps.googleusercontent.com"
          onLoginSuccess={this.handleSocialLogin.bind(this)}
          onLoginFailure={this.handleSocialLoginFailure.bind(this)}
          scope="https://www.googleapis.com/analytics/v3/management/accounts https://www.googleapis.com/auth/analytics.readonly"
        >
          Login with G
        </SocialButton>
        <br /><br />
        <button onClick={this.gaData.bind(this)}>get ga data</button>
        
      </div>
    );
  }
}

export default App;
