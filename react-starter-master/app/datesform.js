import React, {Component} from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment'

export default class DatesForm extends Component {
  render() {
    const { from, to } = this.props;

    const modifiers = {
      disabled: DateUtils.isPastDay,
      selected: day => DateUtils.isDayInRange(day, this.props)
    };

    return (
      <div className="RangeExample">
        { !from && !to && <p>Please select the <strong>first day</strong>.</p> }
          { from && !to && <p>Please select the <strong>last day</strong>.</p> }
          { from && to &&
            <p>You chose from {
                moment(from).format("L") } to {
                moment(to).format("L") }. <a
                href="#" onClick={this.props.handleResetClick}>Reset</a>
            </p>
        }
        <DayPicker
          ref="daypicker"
          numberOfMonths={ 2 }
          modifiers={ modifiers }
          onDayClick={this.props.handleDayClick}
        />
      </div>
    );
  }
}