import React, {Component} from 'react';
import CityForm from './cityform.js'
import DatesForm from './datesform.js'
import $ from 'jquery'

export default class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { city: '' }
  }

  getString(e) {
    var cityStr = e.target.value;
    this.setState({ city: cityStr })
  }

  render() {
    console.log(this.state)
    return (
      <div className="main">
        <CityForm onChange={this.getString.bind(this)} />
        <DatesForm />
        <button onClick={this.searchCar}>submit</button>
      </div>
    );
  }
}