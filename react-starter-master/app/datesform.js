import React, {Component} from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import Kronos from 'react-kronos'
import moment from 'moment'

export default class DatesForm extends Component {
   constructor(props) {
    super(props)
    this.state = { calendarOpen: false }
  }

  handleClick() {
    this.setState({ calendarOpen: !this.state.calendarOpen })
  }

  handleDayClick(e, day, modifiers) {
    this.setState({ calendarOpen: false })
    //call function in parent component
    this.props.handleDayClick(e, day, modifiers)
  }

  render() {
    const { date } = this.props;

    const modifiers = {
      disabled: this.props.disabled,
      selected: day => DateUtils.isSameDay(day, this.props.date)
    };

    return (
      <div>
        <div className="fields form-wide">
          <div className="field">
            <label>{this.props.label}</label>
            <input type="text" name="city" value={ date ? moment(date).format("L") : 'select date' } onClick={this.handleClick.bind(this)} onChange={this.handleClick.bind(this)}/>
            <span className={"calendar " + (this.state.calendarOpen ? "show" : "")}>
              <DayPicker
                ref="daypicker"
                numberOfMonths={ 1 }
                modifiers={ modifiers }
                onDayClick={this.handleDayClick.bind(this)}
              />
            </span>
          </div>
          <div className="field">
            <label>{ this.props.timelabel }</label>
            <Kronos time={ this.props.time } onChange={ this.props.onChange } />
          </div>
        </div>
      </div>
    );
  }
}