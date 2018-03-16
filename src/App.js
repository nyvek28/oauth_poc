import React, { Component } from 'react';
import axios from 'axios';
import google from './google.png';
import analytics from './analytics.png';
import SocialButton from './SocialButton';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      accounts: [],
      properties: []
    }
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

  gaData() {
    let gaAccounts
    this.gapiRequest('https://www.googleapis.com/analytics/v3/management/accounts')
    .then((accountsResponse) => {
      console.log('Accounts:', accountsResponse);
      gaAccounts = accountsResponse.data.items.map(({ id, name }) => { id, name })
      console.log("hereee", gaAccounts);
      gaAccounts.forEach((account) => {
        this.gapiRequest(`https://www.googleapis.com/analytics/v3/management/accounts/${account.id}/webproperties`)
        .then((propertiesResponse) => {
          console.log('Properties:', propertiesResponse);
          propertiesResponse.data.items.forEach((property) => {
            this.gapiRequest(`https://www.googleapis.com/analytics/v3/management/accounts/${account.id}/webproperties/${property.id}/profiles`)
            .then((viewsResponse) => {
              console.log('Views:', viewsResponse);
            })
          })
        })
      })
    })
  }


  render() {
    return (
      <div className="App">
        <SocialButton
          provider="google"
          appId="906758454500-hom380g9h0spqebdgln880tn1ua8v33n.apps.googleusercontent.com"
          onLoginSuccess={this.handleSocialLogin.bind(this)}
          onLoginFailure={this.handleSocialLoginFailure.bind(this)}
          scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/analytics"
        >
          <img src={google} />
        </SocialButton>
        <br /><br />
        {this.state.user !== ""
          ? <button onClick={this.gaData.bind(this)}>
            <img src={analytics} className="analytics" />
          </button>
          : null
        }
        <p>Accounts: </p>
        <select>
          <option>hey</option>
          <option>test</option>
        </select>
      </div>
    );
  }
}

export default App;
