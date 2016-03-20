import React, {Component} from 'react'
import Car from './car.js'
import moment from 'moment'

export default class CarWrapper extends Component {
  render() {
    var resultsArr = this.props.results
    var results = resultsArr.map(function(data){
      return <Car {...data} />
    })

    return (
      <div className="status-div">
        <div className="ui green message">
          <p>
            Here are your search results for {this.props.city }, pick up day { this.props.startdate } at {moment(this.props.pickuptime, 'HH:mm').format('h:mm a') } and drop off date { this.props.enddate } at { moment(this.props.dropofftime, 'HH:mm').format('h:mm a') }.
          </p>
        </div>
        <div className="ui link cards gut">
          {results}
        </div>
      </div>
    )
}
}
