import React, {Component} from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import CityForm from './cityform.js'
import DatesForm from './datesform.js'
import moment from 'moment';
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

  searchCar(e) {
    var base = 'http://api.hotwire.com/v1/search/car?apikey=83thkexwq5fzm59pt7kgj35y&dest=';
    var from = moment(this.state.from).format("L");
    var to = moment(this.state.to).format("L");
    var city = this.state.city;

    $.ajax({
      url: base+city+'&startdate='+from+'&enddate='+to+'&pickuptime=10:00&dropofftime=13:30&format=jsonp',
      dataType: 'jsonp',
      crossDomain: true,
      success: function(data) {
        console.log('success')
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('hotwire endpoint', status, err.toString())
      }.bind(this)
    })
  }

  render() {
    return (
      <div className="main">
        <div className="ui form">
          <CityForm onChange={this.getString.bind(this)} />
          <DatesForm  handleDayClick={this.handleFromClick.bind(this)}
                      label='Pick Up Date'
                      timelabel='Pick Up Time'
                      date={ this.state.from }
                      disabled={ this.calculateDisabledFrom.bind(this) } />
          <DatesForm  handleDayClick={this.handleToClick.bind(this)}
                      label='Drop Off Date'
                      timelabel='Drop Off Time'
                      date={this.state.to}
                      disabled={this.calculateDisabledTo.bind(this)}/>
        </div>
        <button className="ui primary button" onClick={this.searchCar.bind(this)}>Search</button>
      </div>
    );
  }
}