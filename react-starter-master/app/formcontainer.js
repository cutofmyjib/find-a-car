import React, {Component} from 'react'
import { Router, browserHistory } from 'react-router'
import DayPicker, { DateUtils } from 'react-day-picker'
import moment from 'moment'
import CityForm from './cityform.js'
import DatesForm from './datesform.js'

export default class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { city: '', from: null, to: null, pickUpTime: new Date(), dropOffTime: new Date()  }
  }

  static contextTypes = {
      router: React.PropTypes.object.isRequired
  }

  getString(e) {
    var cityStr = e.target.value;
    this.setState({ city: cityStr })
  }

  handleFromClick(e, day, modifiers) {
    this.setState({
      from: modifiers.indexOf('selected') > -1 ? null : day
    });
  }

  handleToClick(e, day, modifiers) {
    this.setState({
      to: modifiers.indexOf('selected') > -1 ? null : day
    });
  }

  //isPastDay(d: date) -> bool (from DateUtils)
  calculateDisabledFrom(day) {
    if (this.state.to) {
      return day >= this.state.to || DateUtils.isPastDay(day);
    }
    return DateUtils.isPastDay(day);
  }

  calculateDisabledTo(day) {
    if (this.state.from) {
      return day <= this.state.from;
    }
    return DateUtils.isPastDay(day);
  }

  setPickUpTime(time) {
    this.setState({ pickUpTime: time })
  }

  setDropOffTime(time) {
    this.setState({ dropOffTime: time })
  }

  searchCar() {
    var city = this.state.city;
    var dateFrom = moment(this.state.from).format("L");
    var dateTo = moment(this.state.to).format("L");
    var timeFrom = moment(this.state.pickUpTime).format("HH:mm");
    var timeTo = moment(this.state.dropOffTime).format("HH:mm");
    this.context.router.push({
      pathname: '/search/',
      query: {  dest: city,
                startdate: dateFrom,
                enddate: dateTo,
                pickuptime: timeFrom,
                dropofftime: timeTo
              }
    })
  }

  render() {
    console.log(this.state.data)
    return (
      <div className="main">
        <div className="ui form">
          <CityForm onChange={ this.getString.bind(this) } />
          <DatesForm  handleDayClick={ this.handleFromClick.bind(this) }
                      label='Pick Up Date'
                      date={ this.state.from }
                      disabled={ this.calculateDisabledFrom.bind(this) }
                      timelabel='Pick Up Time'
                      time={ this.state.pickUpTime }
                      onChange={ this.setPickUpTime.bind(this) } />
          <DatesForm  handleDayClick={ this.handleToClick.bind(this) }
                      label='Drop Off Date'
                      timelabel='Drop Off Time'
                      date={ this.state.to }
                      disabled={ this.calculateDisabledTo.bind(this) }
                      time={ this.state.dropOffTime }
                      onChange={ this.setDropOffTime.bind(this) } />
        </div>
        <button className="ui primary button custom-color1" onClick={ this.searchCar.bind(this) }>Search</button>
      </div>
    );
  }
}