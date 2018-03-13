import React, { Component } from 'react';
import SocialButton from './SocialButton';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  handleSocialLogin(user) {
    console.log(user);
  }

  handleSocialLoginFailure(err) {
    console.log(err);
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
          onLoginSuccess={this.handleSocialLogin}
          onLoginFailure={this.handleSocialLoginFailure}
          scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/analytics.readonly"
        >
          Login with G
        </SocialButton>
      </div>
    );
  }
}

export default App;
