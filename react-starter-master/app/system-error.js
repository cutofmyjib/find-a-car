import React, {Component} from 'react'

export default class SystemError extends Component {
  render() {
    return (
      <div className="status-div">
        <div className="ui purple message">
          <div className="header">
            {this.props.message}
          </div>
        </div>
      </div>
    )
  }
}