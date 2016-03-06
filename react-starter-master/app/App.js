import React, {Component} from 'react';
import {render} from 'react-dom';
import Header from './header.js'
import FormContainer from './formcontainer.js'

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

render(<App />, document.getElementById('root'));
