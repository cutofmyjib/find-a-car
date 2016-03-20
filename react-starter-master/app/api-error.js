import React, {Component} from 'react'

export default class APIError extends Component {
  render() {
    return (
      <div className="status-div">
        <div className="ui error message">
          <div className="header">
            There was some errors with the Hotwire API, for more information check out the console.
          </div>
        </div>
      </div>
    )
  }
}