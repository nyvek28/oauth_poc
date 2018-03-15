import React, { Component } from 'react';
import SocialButton from './SocialButton';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  handleSocialLoginFailure(err) {
    console.log(err);
  }

  gaData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
        'https://www.googleapis.com/analytics/v3/management/accounts')
    xhr.onreadystatechange = function (e) {
      console.log(xhr.response);
    };
    xhr.send(null);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={this.gaData.bind(this)}>get ga data</button>
        
      </div>
    );
  }
}

export default App;
