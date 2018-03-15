import React, { Component } from 'react';
import axios from 'axios';
import SocialButton from './SocialButton';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      accounts: [],
      properties: []
    }
    this.handleFetchAccounts = this.handleFetchAccounts.bind(this);
  }

  gapiRequest(url) {
    return axios.get(url, {
      headers: {
        "authorization": "Bearer " + this.state.user._token.accessToken
      }
    })
  }

  handleSocialLogin(user) {
    this.setState({
      user: user
    });
  }

  handleSocialLoginFailure(err) {
    console.log(err);
  }

  handleFetchAccounts(accounts) {
    this.setState({
      accounts
    }, this.handleFetchProperties(this.state.accounts));
  }

  handleFetchProperties(properties) {
    this.state.accounts.map(item => {
      this.gapiRequest('https://www.googleapis.com/analytics/v3/management/accounts/' + item.id + '/webproperties')
        .then((res) => this.setState({
          properties: res.data.items.map(item => ({
            name: item.name,
            id: item.id,
            accountId: item.accountId
          }))
        })
        )
    })
  }

  gaData() {
    this.gapiRequest('https://www.googleapis.com/analytics/v3/management/accounts')
    .then((accountsResponse) => {
      accountsResponse.data.items.forEach((account) => {
        this.gapiRequest(`https://www.googleapis.com/analytics/v3/management/accounts/${account.id}/webproperties`)
        .then((propertiesResponse) => {
          console.log(propertiesResponse);
        })
      })
    })
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
          appId="906758454500-hom380g9h0spqebdgln880tn1ua8v33n.apps.googleusercontent.com"
          onLoginSuccess={this.handleSocialLogin.bind(this)}
          onLoginFailure={this.handleSocialLoginFailure.bind(this)}
          scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/analytics"
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
