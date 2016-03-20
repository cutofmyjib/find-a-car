import React, {Component} from 'react'
import { Router, browserHistory } from 'react-router'
import DayPicker, { DateUtils } from 'react-day-picker'
import moment from 'moment'
import CityForm from './cityform.js'
import DatesForm from './datesform.js'
import FormBlock from './form-block.js'
import FormWide from './form-wide.js'

export default class FormContainer extends Component {
  constructor(props) {
    super(props)
    var defaultPU = moment().add(3, 'hours').startOf('hour').toDate()
    var defaultDO = moment().add(1, 'day').add(3, 'hours').startOf('hour').toDate()
    this.state = {
      status: 'start',
      city: props.city || '',
      from: defaultPU,
      to: defaultDO,
      pickUpTime: defaultPU,
      dropOffTime: defaultDO
    }
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
      query: {  city: city,
                startdate: dateFrom,
                enddate: dateTo,
                pickuptime: timeFrom,
                dropofftime: timeTo
              }
    })
  }

  render() {
    var props = {
      getString: this.getString.bind(this),
      city:  this.state.city,
      handleFromClick: this.handleFromClick.bind(this),
      from: this.state.from,
      calculateDisabledFrom: this.calculateDisabledFrom.bind(this),
      pickUpTime: this.state.pickUpTime,
      setPickUpTime: this.setPickUpTime.bind(this),
      handleToClick: this.handleToClick.bind(this),
      to: this.state.to,
      calculateDisabledTo: this.calculateDisabledTo.bind(this),
      dropOffTime: this.state.dropOffTime,
      setDropOffTime: this.setDropOffTime.bind(this),
      searchCar: this.searchCar.bind(this)
    }

    return (
      (this.props.blockFormat) ? <FormBlock { ...props } /> : <FormWide { ...props } />
    );
  }
}