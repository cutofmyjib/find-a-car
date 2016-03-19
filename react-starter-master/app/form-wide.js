import React, {Component} from 'react'
import CityForm from './cityform.js'
import DatesForm from './datesform.js'

export default class FormWide extends Component {
  render() {
    return (
      <div className="ui form">
        <div className="fields form-wide">
          <CityForm onChange={ this.props.getString }
                    city={ this.props.city } />
          <div className="field">
              <DatesForm  handleDayClick={ this.props.handleFromClick }
                          label='Pick Up Date'
                          date={ this.props.from }
                          disabled={ this.props.calculateDisabledFrom }
                          timelabel='Pick Up Time'
                          time={ this.props.pickUpTime }
                          onChange={ this.props.setPickUpTime } />
          </div>
          <div className="field">
              <DatesForm  handleDayClick={ this.props.handleToClick }
                          label='Drop Off Date'
                          timelabel='Drop Off Time'
                          date={ this.props.to }
                          disabled={ this.props.calculateDisabledTo }
                          time={ this.props.dropOffTime }
                          onChange={ this.props.setDropOffTime } />
          </div>
          <div className="field button-form-wide">
            <button className="ui inverted green button inline" onClick={ this.props.searchCar }>Search</button>
          </div>
        </div>
      </div>
    )
  }
}