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
    var from = moment(this.state.from).format("L");
    var to = moment(this.state.to).format("L");
    var city = this.state.city;
    $.ajax({
      url: 'http://api.hotwire.com/v1/search/car?apikey=83thkexwq5fzm59pt7kgj35y&dest='+city+'&startdate='+from+'&enddate='+to+'&pickuptime=10:00&dropofftime=13:30&format=jsonp',
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
    //using input city and dates - call the hotwire api get endpoint
    // to find cars avail.
    console.log('you searched for ' + city)
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