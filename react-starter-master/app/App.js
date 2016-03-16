import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import Header from './header.js'
import FormContainer from './formcontainer.js'
import Search from './search'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <FormContainer />
      </div>
    );
  }
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="search" component={Search} />
  </Router>
), document.getElementById("root"));
