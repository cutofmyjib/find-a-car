import React, {Component} from 'react';
import CityForm from './cityform.js'
import DatesForm from './datesform.js'

export default class FormContainer extends Component {
  render() {
    return (
      <div className="main">
        <CityForm />
        <DatesForm />
      </div>
    );
  }
}