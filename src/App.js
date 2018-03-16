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
      properties: [],
      views: []
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
    let gaAccounts = []
    this.gapiRequest('https://www.googleapis.com/analytics/v3/management/accounts')
    .then((accountsResponse) => {
      this.setState({ accounts: accountsResponse.data });
      accountsResponse.data.items.map(item => {
        let account = {
          name: item.name,
          id: item.id
        }
        gaAccounts.push(account);
      })
      gaAccounts.forEach((account) => {
        this.gapiRequest(`https://www.googleapis.com/analytics/v3/management/accounts/${account.id}/webproperties`)
        .then((propertiesResponse) => {
          this.setState({ properties: propertiesResponse.data })
          propertiesResponse.data.items.forEach((property) => {
            this.gapiRequest(`https://www.googleapis.com/analytics/v3/management/accounts/${account.id}/webproperties/${property.id}/profiles`)
            .then((viewsResponse) => {
              this.setState({ views: viewsResponse.data })
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
        {this.state.accounts.length !== 0
          ? <div><p>Accounts: </p>
            <select>
              {this.state.accounts.items.map(item => {<options id={item.id}>{item.id} - {item.name}</options>})}
            </select></div>
          : null
        }
        
      </div>
    );
  }
}

export default App;
