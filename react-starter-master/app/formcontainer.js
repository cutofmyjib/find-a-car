import React, {Component} from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import CityForm from './cityform.js'
import DatesForm from './datesform.js'
import $ from 'jquery'

export default class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { city: '', from: null, to: null }
  }

  getString(e) {
    var cityStr = e.target.value;
    this.setState({ city: cityStr })
  }

  handleDayClick(e, day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick(e) {
    e.preventDefault();
    this.setState({
      from: null,
      to: null
    })
  }

  searchCar(e) {
    //get the input city
    //get the dates
    //using input city and dates - call the hotwire api get endpoint
    // to find cars avail.
    console.log('you searched for ' + this.state.city)
  }

  render() {
    console.log(this.state)
    return (
      <div className="main">
        <CityForm onChange={this.getString.bind(this)} />
        <DatesForm  handleDayClick={this.handleDayClick.bind(this)}
                    handleResetClick={this.handleResetClick.bind(this)}
                    from={this.state.from}
                    to={this.state.to}  />
        <button onClick={this.searchCar.bind(this)}>submit</button>
      </div>
    );
  }
}